import { MinusIcon } from "lucide-react";
import { useTrackStore } from "~/store/track-store";
import { Button } from "../ui/button";
import AddTracksToPlaylistDialog from "./add-tracks-to-playlist-dialog";
import DeletePlaylistDialog from "./delete-playlist-dialog";

export default function PlaylistActionButtons() {
  const isStageEmpty = useTrackStore((store) => store.stagedTracks.size === 0);

  return (
    <div className="flex items-center gap-4">
      <Button size="sm" variant="secondary" disabled={isStageEmpty}>
        <MinusIcon />
        Remove from playlist
      </Button>
      <AddTracksToPlaylistDialog />
      <DeletePlaylistDialog />
    </div>
  );
}
