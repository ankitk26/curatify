import { useMutation } from "@tanstack/react-query";
import { useNavigate, useParams } from "@tanstack/react-router";
import { Trash2Icon } from "lucide-react";
import { toast } from "sonner";
import { query } from "~/queries";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

export default function DeletePlaylistDialog() {
  const { playlistId } = useParams({
    from: "/_protected/playlists/$playlistId",
  });
  const navigate = useNavigate();

  const deletePlaylistMutation = useMutation({
    mutationFn: async () => {
      await query.playlists.delete(playlistId);
    },
    onSuccess: async () => {
      toast.success("Playlist deleted");
      await navigate({ to: "/" });
    },
    onError: () => {
      toast.error("Something went wrong", {
        description: "Please try again later",
      });
    },
  });

  return (
    <Dialog>
      <DialogTrigger>
        <Button size="sm" variant="destructive">
          <Trash2Icon />
          Delete playlist
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirm deletion</DialogTitle>
          <DialogDescription>
            Please confirm to delete the playlist
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose>
            <Button
              variant="outline"
              disabled={deletePlaylistMutation.isPending}
            >
              Close
            </Button>
          </DialogClose>
          <Button
            variant="destructive"
            disabled={deletePlaylistMutation.isPending}
            onClick={() => deletePlaylistMutation.mutate()}
          >
            {deletePlaylistMutation.isPending ? "Deleting..." : "Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
