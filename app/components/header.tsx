import { useSuspenseQuery } from "@tanstack/react-query";
import { useCanGoBack, useNavigate, useRouter } from "@tanstack/react-router";
import { ArrowLeftIcon, LogOutIcon } from "lucide-react";
import { authClient } from "~/lib/auth-client";
import { query } from "~/queries";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export default function Header() {
  const navigate = useNavigate();
  const router = useRouter();

  const { data } = useSuspenseQuery(query.users.me);
  const canGoBack = useCanGoBack();

  return (
    <header className="flex items-center justify-between gap-16">
      <div className="flex items-center gap-4 flex-1">
        <Button
          disabled={!canGoBack}
          variant="outline"
          size="icon"
          onClick={() => {
            router.history.back();
          }}
        >
          <ArrowLeftIcon />
        </Button>
        <Input
          className="flex-1"
          placeholder="Search playlists, albums, artists and tracks"
        />
      </div>

      <div className="flex items-center gap-4">
        <Avatar>
          <AvatarImage src={data?.user.image ?? ""} alt={data?.user.name} />
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
