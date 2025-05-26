import { useMutation, useQueryClient } from "@tanstack/react-query";
import { PlusIcon } from "lucide-react";
import { FormEvent, useState } from "react";
import { toast } from "sonner";
import { query } from "~/queries";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Switch } from "./ui/switch";
import { Textarea } from "./ui/textarea";

export default function AddPlaylistDialog() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [isPublic, setIsPublic] = useState(false);

  const queryClient = useQueryClient();

  const createPlaylistMutation = useMutation({
    mutationFn: async () => {
      await query.playlists.add({ name, description, isPublic });
    },
    onSuccess: async () => {
      setName("");
      setDescription("");
      setIsPublic(false);
      setOpen(false);
      await queryClient.invalidateQueries(query.playlists.all);
      toast.success("Playlist created");
    },
    onError: () => {
      toast.error("Something went wrong", { description: "Please try again" });
    },
  });

  const handlePlaylistCreation = (e: FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    createPlaylistMutation.mutate();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="icon" variant="ghost">
          <PlusIcon />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create new playlist</DialogTitle>
        </DialogHeader>

        <form onSubmit={handlePlaylistCreation}>
          <div className="space-y-8 mt-4">
            <div className="space-y-2">
              <Label htmlFor="playlist-name">Playlist name</Label>
              <Input
                id="playlist-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                disabled={createPlaylistMutation.isPending}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="playlist-description">Description</Label>
              <Textarea
                id="playlist-description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                disabled={createPlaylistMutation.isPending}
              />
            </div>

            <div className="flex items-center gap-4">
              <Label htmlFor="playlist-access">Playlist Visibility</Label>
              <div className="flex items-center gap-2">
                <Switch
                  id="playlist-access"
                  checked={isPublic}
                  onCheckedChange={(checked) => setIsPublic(checked)}
                  disabled={createPlaylistMutation.isPending}
                />
                <span className="text-sm text-muted-foreground">
                  {isPublic ? "Public" : "Private"}
                </span>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button type="submit" disabled={createPlaylistMutation.isPending}>
              {createPlaylistMutation.isPending ? "Saving..." : "Save"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
