import { create } from "zustand";

type TrackStoreState = {
  stagedTracks: Set<string>;
  addTrackToStage: (trackId: string) => void;
  removeTrackFromStage: (trackId: string) => void;
  clearStagedTracks: () => void;
};

export const useTrackStore = create<TrackStoreState>()((set, get) => ({
  stagedTracks: new Set<string>(),

  addTrackToStage: (trackId: string) =>
    set((state) => {
      const updated = new Set(state.stagedTracks);
      updated.add(trackId);
      return { stagedTracks: updated };
    }),

  removeTrackFromStage: (trackId: string) =>
    set((state) => {
      const updated = new Set(state.stagedTracks);
      updated.delete(trackId);
      return { stagedTracks: updated };
    }),

  clearStagedTracks: () => {
    set({ stagedTracks: new Set<string>() });
  },
}));
