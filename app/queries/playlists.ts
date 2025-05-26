import { betterFetch } from "@better-fetch/fetch";
import { queryOptions } from "@tanstack/react-query";
import { spotifyApiBaseUrl } from "~/constants";
import { getAuthUser } from "~/lib/get-auth-user";
import { Playlist, Track } from "~/types";

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

  byId: (playlistId: string) =>
    queryOptions({
      queryKey: ["playlist", playlistId],
      queryFn: async () => {
        const auth = await getAuthUser();

        const endpoint = `/playlists/${playlistId}`;

        const res = await betterFetch<Playlist>(endpoint, {
          baseURL: endpoint.startsWith("https") ? "" : spotifyApiBaseUrl,
          headers: {
            Authorization: `Bearer ${auth?.user.accessToken}`,
          },
        });

        const resData = res.data;

        if (!resData) {
          return null;
        }

        const playlist = {
          ...resData,
          tracks: resData.tracks.items.map((item) => item.track),
          count: resData.tracks.total,
        };

        let currUrl = resData.tracks.next;

        while (currUrl !== null) {
          const nextSetResponse = await betterFetch<{
            items: { track: Track }[];
            next?: string;
          }>(currUrl!, {
            baseURL: currUrl!.startsWith("https") ? "" : spotifyApiBaseUrl,
            headers: {
              Authorization: `Bearer ${auth?.user.accessToken}`,
            },
          });

          const nextSetData = nextSetResponse.data;

          if (nextSetData) {
            playlist.tracks.push(
              ...nextSetData.items.map((item) => item.track)
            );
          }

          currUrl = nextSetData?.next;
        }

        return playlist;
      },
    }),

  add: async (params: {
    name: string;
    description: string;
    isPublic: boolean;
  }) => {
    const auth = await getAuthUser();

    const endpoint = `/users/${auth?.user.accountId}/playlists`;

    const { error } = await betterFetch(endpoint, {
      method: "POST",
      body: {
        name: params.name,
        description: params.description,
        public: params.isPublic,
      },
      baseURL: spotifyApiBaseUrl,
      headers: {
        Authorization: `Bearer ${auth?.user.accessToken}`,
      },
    });

    if (error) {
      console.log(error);
      throw new Error(error.message);
    }
  },

  delete: async (playlistId: string) => {
    const auth = await getAuthUser();

    const endpoint = `/playlists/${playlistId}/followers`;

    const { error } = await betterFetch(endpoint, {
      method: "DELETE",
      baseURL: spotifyApiBaseUrl,
      headers: {
        Authorization: `Bearer ${auth?.user.accessToken}`,
      },
    });

    if (error) {
      console.log(error);
      throw new Error(error.message);
    }
  },
};
