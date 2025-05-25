import { useSuspenseQuery } from "@tanstack/react-query";
import { query } from "~/queries";
import CardItem from "../card-item";

export default function PlaylistsGrid() {
  const { data: playlists } = useSuspenseQuery(query.playlists.all);

  return (
    <>
      {playlists
        ?.filter((playlist) => playlist !== null)
        .map((playlist) => (
          <CardItem
            key={"search_results_playlist_" + query}
            item={{
              id: playlist.id,
              image: playlist.images[0].url ?? "",
              title: playlist.name,
              subtitle: playlist.description,
              type: "playlists",
            }}
          />
        ))}
    </>
  );
}
