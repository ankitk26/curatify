import { useQueryClient } from "@tanstack/react-query";
import { useParams } from "@tanstack/react-router";
import { Clock3Icon } from "lucide-react";
import { cn } from "~/lib/utils";
import { query } from "~/queries";
import { useTrackStore } from "~/store/track-store";
import { Checkbox } from "./ui/checkbox";
import { Separator } from "./ui/separator";

export default function TracksTableHeader({
  showAlbum,
}: {
  showAlbum: boolean;
}) {
  const { albumId, playlistId } = useParams({ strict: false });

  const isStageEmpty = useTrackStore((store) => store.stagedTracks.size === 0);
  const clearStagedTracks = useTrackStore((store) => store.clearStagedTracks);
  const addTrackToStage = useTrackStore((store) => store.addTrackToStage);

  const queryClient = useQueryClient();

  return (
    <>
      <header className="grid grid-cols-12 gap-2 p-4 pb-1 text-muted-foreground">
        <div className="col-span-1">
          <div className="flex items-center font-semibold tracking-wider text-left uppercase h-full min-h-[24px]">
            {!isStageEmpty ? (
              <Checkbox
                id={playlistId}
                onCheckedChange={(checked) => {
                  if (checked) {
                    if (playlistId) {
                      const data = queryClient.getQueryData(
                        query.playlists.byId(playlistId).queryKey
                      );
                      data?.tracks.forEach((track) =>
                        addTrackToStage(track.id)
                      );
                    } else {
                      const data = queryClient.getQueryData(
                        query.albums.byId(albumId ?? "").queryKey
                      );
                      data?.tracks.items.forEach((track) =>
                        addTrackToStage(track.id)
                      );
                    }
                  } else {
                    clearStagedTracks();
                  }
                }}
              />
            ) : (
              <span>#</span>
            )}
          </div>
        </div>

        <div
          className={cn(
            "text-sm flex items-center font-semibold text-left",
            showAlbum ? "col-span-6" : "col-span-10"
          )}
        >
          Title
        </div>

        {showAlbum && (
          <div className="col-span-4 text-sm flex items-center font-semibold text-left">
            Album
          </div>
        )}

        <div className="col-span-1 flex items-center font-semibold text-left">
          <Clock3Icon size={16} />
        </div>
      </header>

      {/* Divider */}
      <Separator />
    </>
  );
}
