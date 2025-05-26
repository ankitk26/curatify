import { useTrackStore } from "~/store/track-store";
import { Button } from "../ui/button";

export default function PlaylistActionButtons() {
  const isStageEmpty = useTrackStore((store) => store.stagedTracks.size === 0);

  return (
    <div className="flex items-center gap-4">
      <Button size="sm" variant="secondary" disabled={isStageEmpty}>
        Remove from playlist
      </Button>
      <Button size="sm" variant="secondary" disabled={isStageEmpty}>
        Add to another playlist
      </Button>
    </div>
  );
}
