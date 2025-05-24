import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { Dot, Music } from "lucide-react";
import { Suspense } from "react";
import PlaylistDescription from "~/components/playlist-description";
import TracksTable from "~/components/tracks-table";
import TracksTableSkeleton from "~/components/tracks-table-skeleton";
import { Skeleton } from "~/components/ui/skeleton";
import { query } from "~/queries";

export const Route = createFileRoute("/_protected/playlists/$playlistId")({
  loader: async ({ context, params }) => {
    const { playlistId } = params;
    await context.queryClient.prefetchQuery(query.playlists.byId(playlistId));
  },
  component: RouteComponent,
});

function RouteComponent() {
  const { playlistId } = Route.useParams();
  const { data: playlist } = useSuspenseQuery(query.playlists.byId(playlistId));

  return (
    <Suspense
      fallback={
        <section className="space-y-20">
          <div className="flex items-end gap-4">
            <Skeleton className="w-64 aspect-square" />
            <div className="flex-1 space-y-4">
              <Skeleton className="h-6 w-32" />
              <Skeleton className="h-6 w-3/4" />
              <div className="flex items-center gap-4">
                <Skeleton className="h-6 w-32" />
                <Skeleton className="h-6 w-32" />
                <Skeleton className="h-6 w-32" />
              </div>
            </div>
          </div>
          <TracksTableSkeleton />
        </section>
      }
    >
      <div className="flex items-end gap-6">
        {playlist && (
          <>
            {playlist.images.length > 0 ? (
              <img
                src={playlist.images[0].url}
                alt={playlist.name}
                height={240}
                width={240}
                className="object-contain rounded-sm w-60 h-60"
              />
            ) : (
              <div className="w-full h-40">
                <Music size={160} className="w-full h-full bg-neutral-800" />
              </div>
            )}

            <div className="flex flex-col gap-3">
              <h5 className="text-xs font-bold uppercase">{playlist.type}</h5>
              <h2 className="text-6xl font-bold">{playlist.name}</h2>

              {playlist.description && (
                <PlaylistDescription description={playlist.description} />
              )}

              <div className="flex items-center text-sm font-semibold">
                <span>{playlist.owner?.display_name}</span>
                {playlist.followers.total > 0 && (
                  <>
                    <Dot />
                    <span>
                      {playlist.followers.total.toLocaleString()}{" "}
                      {playlist.followers.total > 1 ? "likes" : "like"}
                    </span>
                  </>
                )}
                {playlist.tracks.length > 0 && (
                  <>
                    <Dot />
                    <span>{playlist.tracks.length.toLocaleString()} songs</span>
                  </>
                )}
              </div>
            </div>
          </>
        )}
      </div>

      <div className="mt-8">
        {playlist?.tracks && (
          <TracksTable
            tracks={playlist?.tracks.filter((track) => track !== null)}
            showAlbum
            showCover
            showHeader
            showSubtitle
          />
        )}
      </div>
    </Suspense>
  );
}
