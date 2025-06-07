import { useSuspenseQuery } from "@tanstack/react-query";
import { Link, useParams } from "@tanstack/react-router";
import { DotIcon, MusicIcon } from "lucide-react";
import { query } from "~/queries";
import PlaylistControls from "../playlist-controls";
import TracksTable from "../tracks-table";

export default function AlbumPageContent() {
  const { albumId } = useParams({ from: "/_protected/albums/$albumId" });
  const { data: album } = useSuspenseQuery(query.albums.byId(albumId));

  return (
    <>
      <div className="flex items-end gap-6">
        {album && (
          <>
            {album.images && album.images.length > 0 ? (
              <img
                src={album.images[0].url ?? ""}
                alt={album.name}
                height={208}
                width={208}
                className="object-cover rounded-sm aspect-square w-64"
              />
            ) : (
              <div className="w-full h-40">
                <MusicIcon size={160} className="w-full h-full" />
              </div>
            )}
            <div className="flex flex-col gap-3">
              <h5 className="text-xs font-bold uppercase">
                {album.album_type}
              </h5>
              <h2 className="text-5xl font-bold">{album.name}</h2>

              <div className="flex items-center text-sm font-semibold">
                <Link
                  to="/artists/$artistId"
                  params={{ artistId: album.artists[0].id }}
                  className="hover:underline"
                >
                  {album.artists[0].name}
                </Link>
                <DotIcon />
                <span>{new Date(album.release_date).getFullYear()}</span>
                {album.tracks && album.tracks.items.length > 0 && (
                  <>
                    <DotIcon />
                    <span>{album.tracks.total} songs</span>
                  </>
                )}
              </div>
            </div>
          </>
        )}
      </div>

      <div className="mt-8">
        <PlaylistControls />
      </div>

      <div className="mt-2">
        <TracksTable
          tracks={album ? album.tracks.items : []}
          showHeader
          showSubtitle
        />
      </div>
    </>
  );
}
