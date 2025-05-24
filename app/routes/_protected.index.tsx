import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Button } from "~/components/ui/button";
import { authClient } from "~/lib/auth-client";

export const Route = createFileRoute("/_protected/")({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Welcome</h1>
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
