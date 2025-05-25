import { useSuspenseQuery } from "@tanstack/react-query";
import { useParams } from "@tanstack/react-router";
import { query } from "~/queries";
import CardItem from "../card-item";

export default function ArtistSingles() {
  const { artistId } = useParams({ from: "/_protected/artists/$artistId" });
  const { data, isPending } = useSuspenseQuery(
    query.artists.byId(artistId).singles
  );

  if (data && data.length === 0) {
    return null;
  }

  return (
    <div>
      <h1>Singles</h1>
      <div className="grid items-stretch gap-8 mt-4 grid-cols-5">
        {data?.map((album) => (
          <CardItem
            key={album.id}
            item={{
              id: album.id,
              title: album.name,
              subtitle: album.artists[0].name ?? "",
              image: album.images.length > 0 ? album.images[0].url : "",
              type: "albums",
            }}
          />
        ))}
      </div>
    </div>
  );
}
