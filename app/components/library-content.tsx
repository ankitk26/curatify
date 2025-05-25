import { useSuspenseQuery } from "@tanstack/react-query";
import { query } from "~/queries";
import CardItem from "./card-item";

export default function LibraryContent() {
  const { data: playlists } = useSuspenseQuery(query.playlists.all);

  return (
    <div className="grid items-stretch gap-8 mt-4 grid-cols-5">
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
    </div>
  );
}
