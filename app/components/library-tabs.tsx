import { Link, useSearch } from "@tanstack/react-router";
import { Button } from "./ui/button";

export default function LibraryTabs() {
  const { library } = useSearch({ from: "/_protected/" });

  return (
    <div className="flex items-center gap-4">
      <Link to="/" search={{ library: "playlists" }}>
        <Button
          size="sm"
          variant={library === "playlists" ? "default" : "secondary"}
        >
          Playlists
        </Button>
      </Link>
      <Link to="/" search={{ library: "artists" }}>
        <Button
          size="sm"
          variant={library === "artists" ? "default" : "secondary"}
        >
          Artists
        </Button>
      </Link>
      <Link to="/" search={{ library: "albums" }}>
        <Button
          size="sm"
          variant={library === "albums" ? "default" : "secondary"}
        >
          Albums
        </Button>
      </Link>
      <Link to="/" search={{ library: "tops" }}>
        <Button
          size="sm"
          variant={library === "tops" ? "default" : "secondary"}
        >
          Your Tops
        </Button>
      </Link>
    </div>
  );
}
