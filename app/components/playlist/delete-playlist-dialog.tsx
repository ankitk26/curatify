import { useMutation } from "@tanstack/react-query";
import { useNavigate, useParams } from "@tanstack/react-router";
import { Trash2Icon } from "lucide-react";
import { toast } from "sonner";
import { query } from "~/queries";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { Button } from "../ui/button";

export default function DeletePlaylistDialog() {
  const { playlistId } = useParams({ strict: false });
  if (!playlistId) {
    return null;
  }

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
    <AlertDialog>
      <AlertDialogTrigger>
        <Button size="sm" variant="destructive">
          <Trash2Icon />
          Delete playlist
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Confirm deletion</AlertDialogTitle>
          <AlertDialogDescription>
            Please confirm to delete the playlist
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Close</AlertDialogCancel>
          <AlertDialogAction
            disabled={deletePlaylistMutation.isPending}
            onClick={() => {
              toast.info("Deleting playlist");
              deletePlaylistMutation.mutate();
            }}
          >
            {deletePlaylistMutation.isPending ? "Deleting..." : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
