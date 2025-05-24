import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Button } from "~/components/ui/button";
import { authClient } from "~/lib/auth-client";
import { query } from "~/queries";

export const Route = createFileRoute("/_protected/")({
  loader: async ({ context }) => {
    await context.queryClient.prefetchQuery(query.playlists.all);
  },
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();
  const { data, isPending } = useSuspenseQuery(query.playlists.all);

  if (isPending) {
    return <p>Loading playlists...</p>;
  }

  return (
    <div>
      <h1>Welcome</h1>

      <pre>{JSON.stringify(data, null, 4)}</pre>

      <Button
        onClick={async () => {
          await authClient.signOut();
          await navigate({ to: "/login" });
        }}
      >
        Logout
      </Button>
    </div>
  );
}
