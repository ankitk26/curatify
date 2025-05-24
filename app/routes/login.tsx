import { createFileRoute } from "@tanstack/react-router";
import { Button } from "~/components/ui/button";
import { authClient } from "~/lib/auth-client";

export const Route = createFileRoute("/login")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <div className="border p-16 rounded-xl flex flex-col items-center">
        <h1 className="text-4xl font-semibold">curatify</h1>
        <p className="mt-2 text-muted-foreground">
          Manage your Spotify playlists with ease
        </p>
        <Button
          className="mt-8"
          size="lg"
          onClick={async () => {
            await authClient.signIn.social({
              provider: "spotify",
            });
          }}
        >
          Log in
        </Button>
      </div>
    </div>
  );
}
