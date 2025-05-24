import { useSuspenseQuery } from "@tanstack/react-query";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "./ui/sidebar";
import { query } from "~/queries";

export default function SidebarPlaylists() {
  const { data, isPending } = useSuspenseQuery(query.playlists.all);

  return (
    <Sidebar>
      <SidebarHeader>
        <h1 className="text-2xl font-semibold">curatify</h1>
      </SidebarHeader>
      <SidebarContent className="px-2 mt-4">
        <div className="flex flex-col items-start space-y-4">
          {data?.map((playlist) => (
            <div className="flex items-center gap-4">
              <img
                src={playlist.images[0].url}
                alt={playlist.name}
                className="rounded-lg w-10 aspect-square"
              />
              <h4 id={playlist.id + "_sidebar"} className="text-sm">
                {playlist.name}
              </h4>
            </div>
          ))}
        </div>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
