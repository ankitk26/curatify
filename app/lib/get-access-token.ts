import { db } from "~/db";
import { account } from "~/db/schema";
import { Session } from "better-auth";
import { eq } from "drizzle-orm";
import { betterFetch } from "@better-fetch/fetch";
import { createServerFn } from "@tanstack/react-start";

const getNewExpiryDate = (expiresIn: number) => {
  const currentTime = Date.now();
  const expiryTime = currentTime + expiresIn * 1000;
  return new Date(expiryTime);
};

const refreshTokenFromSpotify = async (
  refreshToken: string,
  userId: string
) => {
  const response = await betterFetch<{
    access_token: string;
    expires_in: number;
    refresh_token: string;
  }>("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "content-type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: refreshToken,
      client_id: process.env.SPOTIFY_CLIENT_ID as string,
    }),
  });

  console.log("DATA AFTER REFRESHING TOKEN : ", response.data);

  if (!response.data) {
    return null;
  }

  const updatedExpiryDate = getNewExpiryDate(response.data.expires_in);
  try {
    await db
      .update(account)
      .set({
        accessToken: response.data.access_token,
        accessTokenExpiresAt: updatedExpiryDate,
        refreshToken: response.data.refresh_token,
      })
      .where(eq(account.userId, userId));
  } catch (e) {
    console.error(e);
  }

  return response.data.access_token;
};

export const getAccessToken = createServerFn({ method: "GET" })
  .validator((session: Session) => session)
  .handler(async ({ data: session }) => {
    const accountData = await db
      .select({
        accessToken: account.accessToken,
        accessTokenExpiresAt: account.accessTokenExpiresAt,
        refreshToken: account.refreshToken,
      })
      .from(account)
      .where(eq(account.userId, session.userId))
      .limit(1)
      .then((res) => res[0]);

    // Return null if no account is found
    if (!accountData) {
      return null;
    }

    // check expiry date of access token
    const tokenExpiry = new Date(
      accountData.accessTokenExpiresAt ?? Date.now()
    ).getTime();
    const currentTime = Date.now();

    if (currentTime >= tokenExpiry) {
      // Refresh token if it expired
      const newAccessToken = await refreshTokenFromSpotify(
        accountData.refreshToken as string,
        session.userId
      );
      return newAccessToken;
    }

    return accountData.accessToken;
  });
