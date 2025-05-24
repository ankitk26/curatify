import { createServerFn } from "@tanstack/react-start";
import { auth } from "./auth";
import { getWebRequest } from "@tanstack/react-start/server";

export const getAuthUser = createServerFn({ method: "GET" }).handler(
  async () => {
    console.log("fetching user...");
    const request = getWebRequest();
    if (!request) {
      throw new Error("Request not found");
    }

    const session = await auth.api.getSession({ headers: request.headers });
    return session;
  }
);
