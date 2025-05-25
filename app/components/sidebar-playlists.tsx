import { useSuspenseQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { query } from "~/queries";
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
      <SidebarHeader className="mt-2 px-6">
        <Link to="/" className="text-2xl font-semibold">
          curatify
        </Link>
      </SidebarHeader>
      <SidebarContent className="px-6 mt-8 flex-1 min-h-0">
        <ScrollArea className="h-full pr-2">
          <div className="flex flex-col items-start space-y-6">
            {playlists?.map((playlist) => (
              <Link
                to="/playlists/$playlistId"
                params={{ playlistId: playlist.id }}
                className="flex items-center gap-4 w-full"
              >
                <img
                  src={playlist.images[0].url}
                  alt={playlist.name}
                  className="rounded-lg w-12 aspect-square"
                />
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
