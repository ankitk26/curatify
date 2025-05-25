import { betterFetch } from "@better-fetch/fetch";
import { queryOptions } from "@tanstack/react-query";
import { spotifyApiBaseUrl } from "~/constants";
import { getAuthUser } from "~/lib/get-auth-user";
import { Album } from "~/types";

export const albumQueries = {
  all: queryOptions({
    queryKey: ["albums"],
    queryFn: async () => {
      const auth = await getAuthUser();

      const endpoint = "/me/albums?market=from_token&limit=50";

      const res = await betterFetch<{ items: { album: Album }[] }>(endpoint, {
        baseURL: endpoint.startsWith("https") ? "" : spotifyApiBaseUrl,
        headers: {
          Authorization: `Bearer ${auth?.user.accessToken}`,
        },
      });

      return res.data?.items.map((album) => album.album);
    },
  }),

  byId: (albumId: string) =>
    queryOptions({
      queryKey: ["albums", albumId],
      queryFn: async () => {
        const auth = await getAuthUser();

        const endpoint = `/albums/${albumId}`;

        const res = await betterFetch<Album>(endpoint, {
          baseURL: endpoint.startsWith("https") ? "" : spotifyApiBaseUrl,
          headers: {
            Authorization: `Bearer ${auth?.user.accessToken}`,
          },
        });

        return res.data;
      },
    }),
};
