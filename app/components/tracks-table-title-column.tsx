import { Link } from "@tanstack/react-router";
import { MusicIcon } from "lucide-react";
import { cn } from "~/lib/utils";
import { Track } from "~/types";

type Props = {
  track: Track;
  showAlbum?: boolean;
  showCover?: boolean;
  showSubtitle?: boolean;
};

export default function TracksTableTitleColumn({
  track,
  showAlbum,
  showCover,
  showSubtitle,
}: Props) {
  return (
    <div
      className={cn(
        "flex items-center w-full",
        showAlbum ? "col-span-6" : "col-span-10"
      )}
    >
      <div className="flex items-center w-full gap-4">
        {showCover &&
          (track.album.images && track.album.images.length > 0 ? (
            <div className="flex-shrink-0 w-10 h-10">
              <img
                src={track.album.images?.[0].url as string}
                alt={track.name}
                height={40}
                width={40}
                className="object-contain w-10 h-10 rounded"
              />
            </div>
          ) : (
            <MusicIcon
              size={16}
              className="w-10 h-10 p-2 rounded bg-input/30"
            />
          ))}

        <div className="w-full pr-3 truncate">
          <span className="w-10/12 text-sm font-medium truncate">
            {track.name}
          </span>

          {showSubtitle && (
            <div className="flex flex-wrap items-center w-full gap-1 pr-3 text-sm text-muted-foreground">
              <span className="truncate">
                {track.artists.map((artist, index) => (
                  <>
                    <Link
                      key={artist.id + track.id}
                      to="/artists/$artistId"
                      params={{ artistId: artist.id }}
                      className="hover:underline"
                    >
                      {artist.name}
                    </Link>
                    {index !== track.artists.length - 1 && ", "}
                  </>
                ))}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
