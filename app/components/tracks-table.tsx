import { Track } from "~/types";
import TracksTableHeader from "./tracks-table-header";
import TracksTableRow from "./tracks-table-row";

type Props = {
  tracks: Track[];
  showHeader?: boolean;
  showCover?: boolean;
  showAlbum?: boolean;
  showSubtitle?: boolean;
};

export default function TracksTable({
  tracks,
  showSubtitle = false,
  showCover = false,
  showHeader = false,
  showAlbum = false,
}: Props) {
  return (
    <div>
      {showHeader && <TracksTableHeader showAlbum={showAlbum} />}

      <div className="w-full col-span-12">
        {tracks
          ?.filter((track) => track.name.trim().length > 0)
          .map((track, index) => (
            <TracksTableRow
              key={track.id}
              index={index}
              track={track}
              showAlbum={showAlbum}
              showSubtitle={showSubtitle}
              showCover={showCover}
            />
          ))}
      </div>
    </div>
  );
}
