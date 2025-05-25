import { useSuspenseQuery } from "@tanstack/react-query";
import { query } from "~/queries";
import CardItem from "../card-item";
import { Suspense } from "react";

export default function ArtistsGrid() {
  const { data: artists } = useSuspenseQuery(query.artists.all);

  return (
    <Suspense fallback={<p>Loading artists...</p>}>
      {artists?.map((artist) => (
        <CardItem
          key={"search_results_artist_" + query + "_" + artist.id}
          item={{
            id: artist.id,
            image:
              artist.images && artist.images.length > 0
                ? artist.images[0].url
                : "",
            title: artist.name,
            type: "artists",
          }}
        />
      ))}
    </Suspense>
  );
}
