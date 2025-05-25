import { useSuspenseQuery } from "@tanstack/react-query";
import { useParams } from "@tanstack/react-router";
import { Music } from "lucide-react";
import { query } from "~/queries";
import { Badge } from "../ui/badge";
import { Skeleton } from "../ui/skeleton";

export default function ArtistHero() {
  const { artistId } = useParams({ from: "/_protected/artists/$artistId" });
  const { data: artist, isPending } = useSuspenseQuery(
    query.artists.byId(artistId).info
  );

  if (isPending) {
    return (
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
    );
  }

  return (
    <div className="flex items-end gap-6">
      {artist && (
        <>
          {artist.images.length > 0 ? (
            <img
              src={artist.images[0].url}
              alt={artist.name}
              height={208}
              width={208}
              className="object-cover rounded-full w-64 h-64"
            />
          ) : (
            <div className="w-full h-40">
              <Music size={160} className="w-full h-full bg-card" />
            </div>
          )}
          <div className="flex flex-col items-start gap-3">
            <h2 className="text-5xl font-bold">{artist.name}</h2>
            <span className="text-sm">
              {artist.followers?.total.toLocaleString()} followers
            </span>
            <div className="flex items-center gap-5 text-sm">
              {artist?.genres?.map((genre: string) => (
                <Badge key={genre}>{genre}</Badge>
                // <span
                //   key={genre}
                //   className="px-4 py-1 text-xs capitalize rounded-full bg-neutral-800 hover:bg-neutral-950"
                // >
                //   {genre}
                // </span>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
