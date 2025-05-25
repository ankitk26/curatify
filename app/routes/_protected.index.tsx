import { createFileRoute } from "@tanstack/react-router";
import { Button } from "~/components/ui/button";
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
        <Button variant="secondary">Artists</Button>
        <Button variant="secondary">Albums</Button>
        <Button variant="secondary">Playlists</Button>
        <Button variant="secondary">Your Tops</Button>
      </div>
    </div>
  );
}
