import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { MusicIcon, PlusIcon } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { cn } from "~/lib/utils";
import { query } from "~/queries";
import { useTrackStore } from "~/store/track-store";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { ScrollArea } from "../ui/scroll-area";

export default function AddTracksToPlaylistDialog() {
  const [selectedPlaylists, setSelectedPlaylists] = useState<Set<string>>(
    new Set()
  );
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const isStageEmpty = useTrackStore((store) => store.stagedTracks.size === 0);
  const stagedTracks = useTrackStore((store) => store.stagedTracks);
  const clearStagedTracks = useTrackStore((store) => store.clearStagedTracks);

  const { data: playlists } = useQuery(query.playlists.all);
  const queryClient = useQueryClient();

  const addTracksMutation = useMutation({
    mutationFn: async () => {
      await query.tracks.addToPlaylists({
        trackIds: [...stagedTracks],
        playlistIds: [...selectedPlaylists],
      });
    },
    onSuccess: async () => {
      await Promise.all(
        [...selectedPlaylists].map((playlistId) =>
          queryClient.invalidateQueries({
            queryKey: query.playlists.byId(playlistId).queryKey,
          })
        )
      );
      clearStagedTracks();
      setSelectedPlaylists(new Set<string>());
      setIsDialogOpen(false);
      toast.success("Tracks added to playlists");
    },
    onError: () => {
      toast.error("Something went wrong", {
        description: "Please try again later",
      });
    },
  });

  const trackCount = stagedTracks.size;
  const playlistCount = selectedPlaylists.size;
  const chunkCount = Math.ceil(trackCount / 100);
  const totalApiCalls = chunkCount * playlistCount;
  const isTooManyApiCalls = totalApiCalls > 10;

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <Button
        size="sm"
        variant="secondary"
        disabled={isStageEmpty}
        onClick={() => {
          if (!isStageEmpty) {
            setIsDialogOpen(true);
          }
        }}
      >
        <PlusIcon />
        Add to another playlist
      </Button>
      <DialogContent className="lg:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Select playlists</DialogTitle>
          <DialogDescription>
            Select playlist(s) where selected tracks will be added
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="max-h-[500px] w-full pr-2">
          <div className="space-y-3">
            {playlists?.map((playlist) => (
              <div
                key={"sidebar_playlist_" + playlist.id}
                className={cn(
                  "flex items-center gap-4 cursor-pointer hover:bg-input/30 rounded-lg p-2 w-full",
                  selectedPlaylists.has(playlist.id)
                    ? "bg-input/30"
                    : "bg-transparent"
                )}
                onClick={() => {
                  setSelectedPlaylists((prev) => {
                    const newSet = new Set(prev);
                    newSet.has(playlist.id)
                      ? newSet.delete(playlist.id)
                      : newSet.add(playlist.id);
                    return newSet;
                  });
                }}
              >
                {playlist.images?.[0]?.url ? (
                  <img
                    src={playlist.images[0].url}
                    alt={playlist.name}
                    className="rounded-lg w-12 aspect-square object-contain"
                  />
                ) : (
                  <div className="w-12 aspect-square rounded-lg bg-input/30 flex items-center justify-center">
                    <MusicIcon className="w-6 h-6 text-muted-foreground" />
                  </div>
                )}
                <h4 className="text-sm">{playlist.name}</h4>
              </div>
            ))}
          </div>
        </ScrollArea>
        <DialogFooter>
          <DialogClose>
            <Button
              variant="outline"
              onClick={() => setSelectedPlaylists(new Set<string>())}
              disabled={addTracksMutation.isPending}
            >
              Cancel
            </Button>
          </DialogClose>
          <Button
            onClick={() => addTracksMutation.mutate()}
            disabled={
              addTracksMutation.isPending ||
              selectedPlaylists.size === 0 ||
              isTooManyApiCalls
            }
          >
            {isTooManyApiCalls
              ? "Too many requests. Reduce tracks or playlists"
              : addTracksMutation.isPending
              ? "Submitting..."
              : "Submit"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
