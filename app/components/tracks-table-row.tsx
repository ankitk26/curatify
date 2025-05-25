import { formatMs } from "~/lib/format-ms";
import { Track } from "~/types";
import TracksTableTitleColumn from "./tracks-table-title-column";
import { Link } from "@tanstack/react-router";

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
  return (
    <div
      className="grid py-2 px-4 rounded-lg grid-cols-12"
      key={track.id + index + 1}
    >
      <span className="flex items-center col-span-1 text-sm text-muted-foreground">
        {index + 1}
      </span>

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
