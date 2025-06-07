import { createFileRoute } from "@tanstack/react-router";
import { Suspense } from "react";
import AlbumPageContent from "~/components/album/album-page-content";
import TracksTableSkeleton from "~/components/tracks-table-skeleton";
import { Skeleton } from "~/components/ui/skeleton";
import { query } from "~/queries";

export const Route = createFileRoute("/_protected/albums/$albumId")({
  loader: async ({ context, params }) => {
    const { albumId } = params;
    context.queryClient.prefetchQuery(query.albums.byId(albumId));
  },
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
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
        <AlbumPageContent />
      </Suspense>
    </div>
  );
}
