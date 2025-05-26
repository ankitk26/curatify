import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "@tanstack/react-router";
import { MinusIcon } from "lucide-react";
import { toast } from "sonner";
import { query } from "~/queries";
import { useTrackStore } from "~/store/track-store";
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

export default function RemoveTracksDialog() {
  const { playlistId } = useParams({
    from: "/_protected/playlists/$playlistId",
  });

  const isStageEmpty = useTrackStore((store) => store.stagedTracks.size === 0);
  const stagedTracks = useTrackStore((store) => store.stagedTracks);
  const clearStagedTracks = useTrackStore((store) => store.clearStagedTracks);

  const queryClient = useQueryClient();

  const removeTracksMutation = useMutation({
    mutationFn: async () => {
      await query.tracks.removeFromPlaylist({
        trackIds: [...stagedTracks],
        playlistId,
      });
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: query.playlists.byId(playlistId).queryKey,
      });
      clearStagedTracks();
      toast.success("Tracks removed");
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
        <Button size="sm" variant="secondary" disabled={isStageEmpty}>
          <MinusIcon />
          Remove from playlist
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Confirm removal</AlertDialogTitle>
          <AlertDialogDescription>
            Please confirm to remove the tracks from this playlist
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Close</AlertDialogCancel>
          <AlertDialogAction
            disabled={removeTracksMutation.isPending}
            onClick={() => {
              toast.info("Removing tracks");
              removeTracksMutation.mutate();
            }}
          >
            {removeTracksMutation.isPending ? "Removing..." : "Remove"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
