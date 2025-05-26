import { useSearch } from "@tanstack/react-router";
import { Suspense } from "react";
import AlbumsGrid from "./home/albums-grid";
import ArtistsGrid from "./home/artists-grid";
import PlaylistsGrid from "./home/playlists-grid";
import TopsGrid from "./home/tops-grid";
import { Skeleton } from "./ui/skeleton";

export default function LibraryContent() {
  const { library } = useSearch({ from: "/_protected/" });

  if (library === "playlists")
    return (
      <Suspense
        fallback={Array.from({ length: 5 }).map((_, index) => (
          <Skeleton
            key={"user_library_playlist_" + index}
            className="aspect-square col-span-1 w-full rounded-md"
          />
        ))}
      >
        <PlaylistsGrid />
      </Suspense>
    );

  if (library === "albums")
    return (
      <Suspense
        fallback={Array.from({ length: 5 }).map((_, index) => (
          <Skeleton
            key={"user_library_album_" + index}
            className="aspect-square col-span-1 w-full rounded-md"
          />
        ))}
      >
        <AlbumsGrid />
      </Suspense>
    );
  if (library === "artists")
    return (
      <Suspense
        fallback={Array.from({ length: 5 }).map((_, index) => (
          <Skeleton
            key={"user_library_artist_" + index}
            className="aspect-square col-span-1 w-full rounded-md"
          />
        ))}
      >
        <ArtistsGrid />
      </Suspense>
    );

  return <TopsGrid />;
}
