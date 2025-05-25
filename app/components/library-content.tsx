import { useSearch } from "@tanstack/react-router";
import AlbumsGrid from "./home/albums-grid";
import ArtistsGrid from "./home/artists-grid";
import PlaylistsGrid from "./home/playlists-grid";
import TopsGrid from "./home/tops-grid";

export default function LibraryContent() {
  const { library } = useSearch({ from: "/_protected/" });

  if (library === "playlists") return <PlaylistsGrid />;
  if (library === "albums") return <AlbumsGrid />;
  if (library === "artists") return <ArtistsGrid />;

  return <TopsGrid />;
}
