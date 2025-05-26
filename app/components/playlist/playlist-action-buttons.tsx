import AddTracksDialog from "./add-tracks-dialog";
import DeletePlaylistDialog from "./delete-playlist-dialog";
import RemoveTracksDialog from "./remove-tracks-dialog";

export default function PlaylistActionButtons() {
  return (
    <div className="flex items-center gap-4">
      <RemoveTracksDialog />
      <AddTracksDialog />
      <DeletePlaylistDialog />
    </div>
  );
}
