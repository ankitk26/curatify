import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import Header from "~/components/header";
import SidebarPlaylists from "~/components/sidebar-playlists";
import { SidebarProvider } from "~/components/ui/sidebar";
import { query } from "~/queries";

export const Route = createFileRoute("/_protected")({
  beforeLoad: async ({ context }) => {
    const auth = await context.queryClient.fetchQuery(query.users.me);
    if (!auth?.user) {
      throw redirect({ to: "/login" });
    }
  },
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <SidebarProvider>
      <SidebarPlaylists />
      <main className="w-full px-8 py-4 flex flex-col items-stretch space-y-8">
        <Header />
        <Outlet />
      </main>
    </SidebarProvider>
  );
}
