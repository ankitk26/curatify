import { betterFetch } from "@better-fetch/fetch";
import { spotifyApiBaseUrl } from "~/constants";
import { getAuthUser } from "~/lib/get-auth-user";

function chunkArray<T>(array: T[], chunkSize: number): T[][] {
  const chunks: T[][] = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    chunks.push(array.slice(i, i + chunkSize));
  }
  return chunks;
}

export const trackQueries = {
  addToPlaylists: async ({
    trackIds,
    playlistIds,
  }: {
    trackIds: string[];
    playlistIds: string[];
  }) => {
    const auth = await getAuthUser();
    const trackChunks = chunkArray(trackIds, 100); // Max 100 per Spotify API
    const accessToken = auth?.user.accessToken;

    await Promise.all(
      playlistIds.map(async (playlistId) => {
        for (const chunk of trackChunks) {
          const endpoint = `/playlists/${playlistId}/tracks`;
          const spotifyMappedTracks = chunk.map((id) => `spotify:track:${id}`);

          const { error } = await betterFetch(endpoint, {
            method: "POST",
            baseURL: spotifyApiBaseUrl,
            body: {
              uris: spotifyMappedTracks,
            },
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });

          if (error) {
            console.error(
              `Failed to add tracks to playlist ${playlistId}`,
              error
            );
            throw new Error(error.message);
          }
        }
      })
    );
  },
};
