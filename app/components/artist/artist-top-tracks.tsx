import { useSuspenseQuery } from "@tanstack/react-query";
import { useParams } from "@tanstack/react-router";
import { query } from "~/queries";
import TracksTable from "../tracks-table";

export default function ArtistTopTracks() {
  const { artistId } = useParams({ from: "/_protected/artists/$artistId" });
  const { data } = useSuspenseQuery(query.artists.byId(artistId).top);

  if (data && data.length === 0) {
    return null;
  }

  return (
    <div className="space-y-2">
      <h1>Popular</h1>
      <TracksTable tracks={data ?? []} showCover />
    </div>
  );
}
