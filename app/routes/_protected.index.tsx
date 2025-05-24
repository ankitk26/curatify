import { createFileRoute } from "@tanstack/react-router";
import { query } from "~/queries";

export const Route = createFileRoute("/_protected/")({
  loader: async ({ context }) => {
    await context.queryClient.prefetchQuery(query.playlists.all);
  },
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Your Library</h1>
      <div className="flex items-center gap-4">
        <div className="bg-card text-card-foreground px-4 py-2 rounded-xl text-sm">
          Artists
        </div>
        <div className="bg-card text-card-foreground px-4 py-2 rounded-xl text-sm">
          Playlists
        </div>
        <div className="bg-card text-card-foreground px-4 py-2 rounded-xl text-sm">
          Albums
        </div>
        <div className="bg-card text-card-foreground px-4 py-2 rounded-xl text-sm">
          Your tops
        </div>
      </div>
    </div>
  );
}
