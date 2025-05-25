import { createFileRoute } from "@tanstack/react-router";
import { Suspense } from "react";
import PlaylistPageContent from "~/components/playlist/playlist-page-content";
import TracksTableSkeleton from "~/components/tracks-table-skeleton";
import { Skeleton } from "~/components/ui/skeleton";
import { query } from "~/queries";

export const Route = createFileRoute("/_protected/playlists/$playlistId")({
  loader: async ({ context, params }) => {
    const { playlistId } = params;
    context.queryClient.prefetchQuery(query.playlists.byId(playlistId));
  },
  component: RouteComponent,
});

function RouteComponent() {
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
      <PlaylistPageContent />
    </Suspense>
  );
}
