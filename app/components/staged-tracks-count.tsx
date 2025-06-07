import { cn } from "~/lib/utils";
import { useTrackStore } from "~/store/track-store";

export default function StagedTracksCount() {
  const stagedTracksCount = useTrackStore((store) => store.stagedTracks.size);

  return (
    <p
      className={cn(
        "text-sm text-muted-foreground",
        stagedTracksCount > 0 ? "block" : "invisible"
      )}
    >
      {stagedTracksCount} track{stagedTracksCount > 1 && "s"} selected
    </p>
  );
}
