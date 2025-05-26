import { Link } from "@tanstack/react-router";
import { formatMs } from "~/lib/format-ms";
import { cn } from "~/lib/utils";
import { useTrackStore } from "~/store/track-store";
import { Track } from "~/types";
import TracksTableTitleColumn from "./tracks-table-title-column";
import { Checkbox } from "./ui/checkbox";

type Props = {
  index: number;
  track: Track;
  showAlbum: boolean;
  showCover: boolean;
  showSubtitle: boolean;
};

export default function TracksTableRow({
  index,
  track,
  showAlbum,
  showCover,
  showSubtitle,
}: Props) {
  const stagedTracks = useTrackStore((store) => store.stagedTracks);
  const addTrackToStage = useTrackStore((store) => store.addTrackToStage);
  const removeTrackFromStage = useTrackStore(
    (store) => store.removeTrackFromStage
  );

  const isStaged = stagedTracks.has(track.id);

  return (
    <div
      className="group grid py-2 px-4 rounded-lg grid-cols-12 cursor-pointer hover:bg-input/30"
      key={track.id + index + 1}
      onClick={() => {
        if (isStaged) {
          removeTrackFromStage(track.id);
        } else {
          addTrackToStage(track.id);
        }
      }}
    >
      <div className="col-span-1 flex items-center justify-center w-fit">
        <div
          className={cn(
            "transition-all",
            isStaged ? "block" : "hidden group-hover:block"
          )}
        >
          <Checkbox
            id={track.id}
            checked={isStaged}
            onCheckedChange={(checked) => {
              if (checked) {
                addTrackToStage(track.id);
              } else {
                removeTrackFromStage(track.id);
              }
            }}
          />
        </div>
        <span
          className={cn(
            "text-sm text-muted-foreground",
            isStaged ? "hidden" : "group-hover:hidden"
          )}
        >
          {index + 1}
        </span>
      </div>

      <TracksTableTitleColumn
        track={track}
        showAlbum={showAlbum}
        showCover={showCover}
        showSubtitle={showSubtitle}
      />

      {showAlbum && (
        <div className="flex items-center w-10/12 col-span-4 text-sm text-muted-foreground">
          <Link
            to="/albums/$albumId"
            params={{ albumId: track.album.id }}
            className="truncate hover:underline"
          >
            {track.album.name}
          </Link>
        </div>
      )}

      <small className="flex items-center col-span-1 text-sm font-medium text-muted-foreground">
        {formatMs(track.duration_ms)}
      </small>
    </div>
  );
}
