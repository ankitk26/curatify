import { useSuspenseQuery } from "@tanstack/react-query";
import { useParams } from "@tanstack/react-router";
import { DotIcon, MusicIcon } from "lucide-react";
import { cn } from "~/lib/utils";
import { query } from "~/queries";
import { useTrackStore } from "~/store/track-store";
import PlaylistDescription from "../playlist-description";
import TracksTable from "../tracks-table";
import PlaylistActionButtons from "./playlist-action-buttons";

export default function PlaylistPageContent() {
  const { playlistId } = useParams({
    from: "/_protected/playlists/$playlistId",
  });
  const { data: playlist } = useSuspenseQuery(query.playlists.byId(playlistId));
  const stagedTracksCount = useTrackStore((store) => store.stagedTracks.size);

  return (
    <div className="space-y-8">
      <div className="flex items-end gap-6">
        {playlist && (
          <>
            {playlist.images && playlist.images.length > 0 ? (
              <img
                src={playlist.images[0].url}
                alt={playlist.name}
                height={240}
                width={240}
                className="object-contain rounded-sm w-60 h-60"
              />
            ) : (
              <div className="w-60 h-60 flex items-center justify-center rounded-sm bg-neutral-800">
                <MusicIcon size={80} className="text-neutral-400" />
              </div>
            )}

            <div className="flex flex-col gap-3">
              <h5 className="text-xs font-bold uppercase">{playlist.type}</h5>
              <h2 className="text-6xl font-bold">{playlist.name}</h2>

              {playlist.description && (
                <PlaylistDescription description={playlist.description} />
              )}

              <div className="flex items-center text-sm font-semibold">
                <span>{playlist.owner?.display_name}</span>
                {playlist.followers.total > 0 && (
                  <>
                    <DotIcon />
                    <span>
                      {playlist.followers.total.toLocaleString()}{" "}
                      {playlist.followers.total > 1 ? "likes" : "like"}
                    </span>
                  </>
                )}
                {playlist.tracks.length > 0 && (
                  <>
                    <DotIcon />
                    <span>{playlist.tracks.length.toLocaleString()} songs</span>
                  </>
                )}
              </div>
            </div>
          </>
        )}
      </div>

      <div className="space-y-2">
        <PlaylistActionButtons />
        <p
          className={cn(
            "text-sm text-muted-foreground",
            stagedTracksCount > 0 ? "block" : "invisible"
          )}
        >
          {stagedTracksCount} track{stagedTracksCount > 1 && "s"} selected
        </p>
      </div>

      <div className="mt-8">
        {playlist?.tracks && (
          <TracksTable
            tracks={playlist?.tracks.filter((track) => track !== null)}
            showAlbum
            showCover
            showHeader
            showSubtitle
          />
        )}
      </div>
    </div>
  );
}
