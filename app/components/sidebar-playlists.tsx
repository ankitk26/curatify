import { useSuspenseQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { MusicIcon } from "lucide-react";
import { query } from "~/queries";
import AddPlaylistDialog from "./add-playlist-dialog";
import { ScrollArea } from "./ui/scroll-area";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "./ui/sidebar";

export default function SidebarPlaylists() {
  const { data: playlists } = useSuspenseQuery(query.playlists.all);

  return (
    <Sidebar>
      <SidebarHeader className="mt-2 px-4 flex flex-row items-center justify-between">
        <Link to="/" className="text-2xl font-semibold">
          curatify
        </Link>
        <AddPlaylistDialog />
      </SidebarHeader>
      <SidebarContent className="px-4 mt-8 flex-1 min-h-0">
        <ScrollArea className="h-full pr-2">
          <div className="flex flex-col items-start space-y-3">
            {playlists?.map((playlist) => (
              <Link
                key={"sidebar_playlist_" + playlist.id}
                to="/playlists/$playlistId"
                params={{ playlistId: playlist.id }}
                activeProps={{
                  className: "bg-input/30",
                }}
                className="flex items-center gap-4 rounded-lg p-2 w-full"
              >
                {playlist.images && playlist.images.length > 0 ? (
                  <img
                    src={playlist.images[0].url}
                    alt={playlist.name}
                    className="rounded-lg w-12 aspect-square object-contain"
                  />
                ) : (
                  <div className="w-12 aspect-square rounded-lg bg-input/30 flex items-center justify-center">
                    <MusicIcon className="w-6 h-6 text-muted-foreground" />
                  </div>
                )}

                <h4 id={playlist.id + "_sidebar"} className="text-sm">
                  {playlist.name}
                </h4>
              </Link>
            ))}
          </div>
        </ScrollArea>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
