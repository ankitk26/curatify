import { betterFetch } from "@better-fetch/fetch";
import { queryOptions } from "@tanstack/react-query";
import { spotifyApiBaseUrl } from "~/constants";
import { getAuthUser } from "~/lib/get-auth-user";
import { Playlist } from "~/types";

export const playlistQueries = {
  all: queryOptions({
    queryKey: ["playlists"],
    queryFn: async () => {
      const auth = await getAuthUser();

      const endpoint = "/me/playlists";

      const res = await betterFetch<{ items: Playlist[] }>(endpoint, {
        baseURL: endpoint.startsWith("https") ? "" : spotifyApiBaseUrl,
        headers: {
          Authorization: `Bearer ${auth?.user.accessToken}`,
        },
      });

      return res.data?.items;
    },
  }),
};
