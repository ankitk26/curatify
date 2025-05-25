import { useSuspenseQuery } from "@tanstack/react-query";
import { useParams } from "@tanstack/react-router";
import { Music } from "lucide-react";
import { query } from "~/queries";
import { Badge } from "../ui/badge";

export default function ArtistHero() {
  const { artistId } = useParams({ from: "/_protected/artists/$artistId" });
  const { data: artist } = useSuspenseQuery(query.artists.byId(artistId).info);

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
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
