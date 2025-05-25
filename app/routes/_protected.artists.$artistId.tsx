import { createFileRoute } from "@tanstack/react-router";
import { Suspense } from "react";
import ArtistAlbums from "~/components/artist/artist-albums";
import ArtistAppearsOn from "~/components/artist/artist-appears-on";
import ArtistHero from "~/components/artist/artist-hero";
import ArtistSingles from "~/components/artist/artist-singles";
import ArtistTopTracks from "~/components/artist/artist-top-tracks";
import SquareSkeletons from "~/components/square-skeletons";
import TracksTableSkeleton from "~/components/tracks-table-skeleton";
import { Skeleton } from "~/components/ui/skeleton";
import { query } from "~/queries";

export const Route = createFileRoute("/_protected/artists/$artistId")({
  loader: ({ context, params }) => {
    const { artistId } = params;
    context.queryClient.prefetchQuery(query.artists.byId(artistId).info);
    context.queryClient.prefetchQuery(query.artists.byId(artistId).albums);
    context.queryClient.prefetchQuery(query.artists.byId(artistId).appearsOn);
    context.queryClient.prefetchQuery(query.artists.byId(artistId).singles);
    context.queryClient.prefetchQuery(query.artists.byId(artistId).top);
  },
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="space-y-16">
      <Suspense
        fallback={
          <div>
            <div className="flex items-end gap-4">
              <Skeleton className="w-64 rounded-full aspect-square" />
              <div className="flex-1 space-y-4">
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-6 w-32" />
                <div className="flex items-center gap-4">
                  <Skeleton className="h-6 w-16" />
                  <Skeleton className="h-6 w-16" />
                  <Skeleton className="h-6 w-16" />
                </div>
              </div>
            </div>
          </div>
        }
      >
        <ArtistHero />
      </Suspense>

      <Suspense fallback={<TracksTableSkeleton />}>
        <ArtistTopTracks />
      </Suspense>

      <Suspense fallback={<SquareSkeletons />}>
        <ArtistAlbums />
      </Suspense>

      <Suspense fallback={<SquareSkeletons />}>
        <ArtistSingles />
      </Suspense>

      <Suspense fallback={<SquareSkeletons />}>
        <ArtistAppearsOn />
      </Suspense>
    </div>
  );
}
