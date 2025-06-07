import PlaylistActionButtons from "./playlist/playlist-action-buttons";
import StagedTracksCount from "./staged-tracks-count";

export default function PlaylistControls() {
  return (
    <div className="space-y-2">
      <PlaylistActionButtons />
      <StagedTracksCount />
    </div>
  );
}
