import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { formatMs } from "~/lib/format-ms";
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
  const [hoveredTrackId, setHoveredTrackId] = useState<string | null>(null);
  const isCurrentRowHovered = track.id === hoveredTrackId;

  const stagedTracks = useTrackStore((store) => store.stagedTracks);
  const addTrackToStage = useTrackStore((store) => store.addTrackToStage);
  const removeTrackFromStage = useTrackStore(
    (store) => store.removeTrackFromStage
  );

  return (
    <div
      className="grid py-2 px-4 rounded-lg grid-cols-12 cursor-pointer hover:bg-input/30"
      key={track.id + index + 1}
      onMouseEnter={() => setHoveredTrackId(track.id)}
      onMouseLeave={() => setHoveredTrackId(null)}
      onClick={() => {
        if (stagedTracks.has(track.id)) {
          removeTrackFromStage(track.id);
        } else {
          addTrackToStage(track.id);
        }
      }}
    >
      {isCurrentRowHovered || stagedTracks.has(track.id) ? (
        <div className="col-span-1 flex items-center justify-center w-fit">
          <Checkbox
            id={track.id}
            checked={stagedTracks.has(track.id)}
            onCheckedChange={(checked) => {
              if (checked) {
                addTrackToStage(track.id);
              } else {
                removeTrackFromStage(track.id);
              }
            }}
          />
        </div>
      ) : (
        <span className="flex items-center col-span-1 text-sm text-muted-foreground">
          {index + 1}
        </span>
      )}

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

      <small className="flex items-center col-span-1 text-sm font-medium text-muted-foreground ">
        {formatMs(track.duration_ms)}
      </small>
    </div>
  );
}
