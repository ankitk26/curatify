import { useSuspenseQuery } from "@tanstack/react-query";
import { query } from "~/queries";
import CardItem from "../card-item";

export default function AlbumsGrid() {
  const { data: albums } = useSuspenseQuery(query.albums.all);

  return (
    <>
      {albums?.map((album) => (
        <CardItem
          key={album.id}
          item={{
            id: album.id,
            image:
              album.images && album.images.length > 0
                ? album.images[0].url
                : "",
            title: album.name,
            subtitle: album.artists[0].name ?? "",
            type: "albums",
          }}
        />
      ))}
    </>
  );
}
