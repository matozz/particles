import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";
import { Breakaway } from "@/playlist/tracks/breakaway";
import { Hero } from "@/playlist/tracks/hero";
import {
  deactivateController,
  updateColorSetting,
  updateRepeatCount,
  updateSequence,
  updateTempo,
} from "../controller";
import type { PlaylistStore, Track } from "./types";

const initialPlaylistStore: PlaylistStore = {
  beats: 0,
  track: undefined,
};

export const usePlaylistStore = create(
  subscribeWithSelector<PlaylistStore>(() => ({ ...initialPlaylistStore })),
);

usePlaylistStore.subscribe(
  (state) => state.beats,
  (beats) => {
    const { track } = usePlaylistStore.getState();
    if (track) {
      applyTrackPattern(track, beats);
    }
  },
);

export const tickPlaylist = () => {
  const { beats } = usePlaylistStore.getState();
  usePlaylistStore.setState({ beats: beats + 1 });
};

export const stopPlaylist = () => {
  usePlaylistStore.setState({ beats: 0 });
  deactivateController();
};

export const loadTrack = () => {
  // const track = Breakaway;
  const track = Hero;
  usePlaylistStore.setState({ track });
  updateTempo(track.tempo);

  applyTrackPattern(track, 1);
};

export const unloadTrack = () => {
  usePlaylistStore.setState({ track: undefined });
};

export const applyTrackPattern = (track: Track, beats: number) => {
  const patterns = track?.patterns.sequences;

  if (!patterns) {
    return;
  }

  const pattern = patterns.find((v) => v.start === beats);

  if (pattern) {
    const { sequence, color, repeat } = pattern.settings;
    updateSequence(sequence);
    updateColorSetting(color);
    updateRepeatCount(repeat);
  }

  // console.log({ beats, pattern });
};
