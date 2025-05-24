import { useNavigate, useRouteContext } from "@tanstack/react-router";
import { LogOutIcon } from "lucide-react";
import { authClient } from "~/lib/auth-client";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export default function Header() {
  const context = useRouteContext({ from: "/_protected" });
  const navigate = useNavigate();

  return (
    <header className="flex items-center justify-between gap-16">
      <Input
        className="flex-1"
        placeholder="Search playlists, albums, artists and tracks"
      />

      <div className="flex items-center gap-4">
        <Avatar>
          <AvatarImage
            src={context.session?.user.image ?? ""}
            alt={context.session?.user.name}
          />
        </Avatar>
        <Button
          size="icon"
          onClick={async () => {
            await authClient.signOut();
            await navigate({ to: "/login" });
          }}
        >
          <LogOutIcon />
        </Button>
      </div>
    </header>
  );
}
