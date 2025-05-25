import { betterFetch } from "@better-fetch/fetch";
import { queryOptions } from "@tanstack/react-query";
import { spotifyApiBaseUrl } from "~/constants";
import { getAuthUser } from "~/lib/get-auth-user";
import { Album, Artist, Track } from "~/types";

export const artistQueries = {
  all: queryOptions({
    queryKey: ["artists"],
    queryFn: async () => {
      const auth = await getAuthUser();

      const endpoint = "/me/following?type=artist&limit=50";

      const res = await betterFetch<{ artists: { items: Artist[] } }>(
        endpoint,
        {
          baseURL: endpoint.startsWith("https") ? "" : spotifyApiBaseUrl,
          headers: {
            Authorization: `Bearer ${auth?.user.accessToken}`,
          },
        }
      );

      return res.data?.artists.items;
    },
  }),

  byId: (artistId: string) => {
    return {
      info: queryOptions({
        queryKey: ["artists", artistId],
        queryFn: async () => {
          const auth = await getAuthUser();

          const endpoint = `/artists/${artistId}`;

          const res = await betterFetch<Artist>(endpoint, {
            baseURL: endpoint.startsWith("https") ? "" : spotifyApiBaseUrl,
            headers: {
              Authorization: `Bearer ${auth?.user.accessToken}`,
            },
          });

          return res.data;
        },
      }),

      albums: queryOptions({
        queryKey: ["artists", "albums", artistId],
        queryFn: async () => {
          const auth = await getAuthUser();

          const endpoint = `/artists/${artistId}/albums?include_groups=album`;

          const res = await betterFetch<{ items: Album[] }>(endpoint, {
            baseURL: endpoint.startsWith("https") ? "" : spotifyApiBaseUrl,
            headers: {
              Authorization: `Bearer ${auth?.user.accessToken}`,
            },
          });

          return res.data?.items;
        },
      }),

      singles: queryOptions({
        queryKey: ["artists", "singles", artistId],
        queryFn: async () => {
          const auth = await getAuthUser();

          const endpoint = `/artists/${artistId}/albums?include_groups=single`;

          const res = await betterFetch<{ items: Album[] }>(endpoint, {
            baseURL: endpoint.startsWith("https") ? "" : spotifyApiBaseUrl,
            headers: {
              Authorization: `Bearer ${auth?.user.accessToken}`,
            },
          });

          return res.data?.items;
        },
      }),

      top: queryOptions({
        queryKey: ["artists", "top", artistId],
        queryFn: async () => {
          const auth = await getAuthUser();

          const endpoint = `/artists/${artistId}/top-tracks?market=from_token`;

          const res = await betterFetch<{ tracks: Track[] }>(endpoint, {
            baseURL: endpoint.startsWith("https") ? "" : spotifyApiBaseUrl,
            headers: {
              Authorization: `Bearer ${auth?.user.accessToken}`,
            },
          });

          return res.data?.tracks;
        },
      }),

      appearsOn: queryOptions({
        queryKey: ["artists", "singles", artistId],
        queryFn: async () => {
          const auth = await getAuthUser();

          const endpoint = `/artists/${artistId}/albums?include_groups=appears_on`;

          const res = await betterFetch<{ items: Album[] }>(endpoint, {
            baseURL: endpoint.startsWith("https") ? "" : spotifyApiBaseUrl,
            headers: {
              Authorization: `Bearer ${auth?.user.accessToken}`,
            },
          });

          return res.data?.items;
        },
      }),
    };
  },
};
