import { useSuspenseQuery } from "@tanstack/react-query";
import { useParams } from "@tanstack/react-router";
import TracksTable from "../tracks-table";
import TracksTableSkeleton from "../tracks-table-skeleton";
import { query } from "~/queries";

export default function ArtistTopTracks() {
  const { artistId } = useParams({ from: "/_protected/artists/$artistId" });
  const { data, isPending } = useSuspenseQuery(
    query.artists.byId(artistId).top
  );

  if (isPending) {
    return <TracksTableSkeleton />;
  }

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
