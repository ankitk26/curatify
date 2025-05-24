import { createFileRoute } from "@tanstack/react-router";
import { Button } from "~/components/ui/button";
import { authClient } from "~/lib/auth-client";

export const Route = createFileRoute("/login")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <Button
        onClick={async () => {
          await authClient.signIn.social({
            provider: "spotify",
          });
        }}
      >
        Log in
      </Button>
    </div>
  );
}
