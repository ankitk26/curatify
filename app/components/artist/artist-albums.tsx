import { useSuspenseQuery } from "@tanstack/react-query";
import { useParams } from "@tanstack/react-router";
import CardItem from "../card-item";
import { query } from "~/queries";

export default function ArtistAlbums() {
  const { artistId } = useParams({ from: "/_protected/artists/$artistId" });
  const { data } = useSuspenseQuery(query.artists.byId(artistId).albums);

  if (data && data.length === 0) {
    return null;
  }

  return (
    <div>
      <h1>Albums</h1>
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
