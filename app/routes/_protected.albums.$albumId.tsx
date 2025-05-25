import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";
import { DotIcon, MusicIcon } from "lucide-react";
import TracksTable from "~/components/tracks-table";
import { query } from "~/queries";

export const Route = createFileRoute("/_protected/albums/$albumId")({
  loader: async ({ context, params }) => {
    const { albumId } = params;
    await context.queryClient.prefetchQuery(query.albums.byId(albumId));
  },
  component: RouteComponent,
});

function RouteComponent() {
  const { albumId } = Route.useParams();
  const { data: album, isPending } = useSuspenseQuery(
    query.albums.byId(albumId)
  );

  // if (isPending) {
  //   return (
  //     <section className="space-y-20">
  //       <div className="flex items-end gap-4">
  //         <Skeleton className="w-64 aspect-square" />
  //         <div className="flex-1 space-y-4">
  //           <Skeleton className="h-6 w-32" />
  //           <Skeleton className="h-6 w-3/4" />
  //           <div className="flex items-center gap-4">
  //             <Skeleton className="h-6 w-32" />
  //             <Skeleton className="h-6 w-32" />
  //             <Skeleton className="h-6 w-32" />
  //           </div>
  //         </div>
  //       </div>
  //       <TracksTableSkeleton />
  //     </section>
  //   );
  // }

  return (
    <div className="space-y-10">
      <div className="flex items-end gap-6">
        {album && (
          <>
            {album.images && album.images.length > 0 ? (
              <img
                src={album.images[0].url ?? ""}
                alt={album.name}
                height={208}
                width={208}
                className="object-cover rounded-sm aspect-square w-64"
              />
            ) : (
              <div className="w-full h-40">
                <MusicIcon size={160} className="w-full h-full" />
              </div>
            )}
            <div className="flex flex-col gap-3">
              <h5 className="text-xs font-bold uppercase">
                {album.album_type}
              </h5>
              <h2 className="text-5xl font-bold">{album.name}</h2>

              <div className="flex items-center text-sm font-semibold">
                <Link
                  to="/artists/$artistId"
                  params={{ artistId: album.artists[0].id }}
                  className="hover:underline"
                >
                  {album.artists[0].name}
                </Link>
                <DotIcon />
                <span>{new Date(album.release_date).getFullYear()}</span>
                {album.tracks && album.tracks.items.length > 0 && (
                  <>
                    <DotIcon />
                    <span>{album.tracks.total} songs</span>
                  </>
                )}
              </div>
            </div>
          </>
        )}
      </div>

      <TracksTable
        tracks={album ? album.tracks.items : []}
        showHeader
        showSubtitle
      />
    </div>
  );
}
