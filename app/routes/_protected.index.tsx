import { createFileRoute } from "@tanstack/react-router";
import { zodValidator } from "@tanstack/zod-adapter";
import { z } from "zod";
import LibraryContent from "~/components/library-content";
import LibraryTabs from "~/components/library-tabs";
import { query } from "~/queries";

const paramsSchema = z.object({
  library: z
    .enum(["artists", "albums", "playlists", "tops"])
    .default("playlists"),
});

export const Route = createFileRoute("/_protected/")({
  validateSearch: zodValidator(paramsSchema),
  loader: async ({ context }) => {
    await context.queryClient.prefetchQuery(query.playlists.all);
  },
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="space-y-10">
      <h1 className="text-2xl font-semibold">Your Library</h1>
      <LibraryTabs />
      <LibraryContent />
    </div>
  );
}
