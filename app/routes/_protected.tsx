import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import Header from "~/components/header";
import SidebarPlaylists from "~/components/sidebar-playlists";
import { SidebarProvider } from "~/components/ui/sidebar";

export const Route = createFileRoute("/_protected")({
  beforeLoad: ({ context }) => {
    if (!context.session?.user) {
      throw redirect({ to: "/login" });
    }
  },
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <SidebarProvider>
      <SidebarPlaylists />
      <main className="w-full px-4 py-2 flex flex-col items-stretch space-y-8">
        <Header />
        <Outlet />
      </main>
    </SidebarProvider>
  );
}
