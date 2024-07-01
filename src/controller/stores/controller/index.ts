import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";
import { resetRuntime } from "../runtime";
import type {
  ControllerExtraSettings,
  ControllerSequenceSetting,
  ControllerStore,
} from "./types";
import {
  generateExtraSetting,
  generateTempoSetting,
  mergeSettings,
} from "./utils";

const initialControllerStore: ControllerStore = {
  isPlaying: false,
  triggerMode: "raf",
  sequence: { type: "flow", options: { density: 0.25 } },
  settings: {
    repeat: 1,
    ...generateTempoSetting(128),
    ...generateExtraSetting("color", {
      mode: "gradient-layout",
      data: {
        colors: ["#0000ff", "#800080", "#0000ff"],
      },
    }),
  },
};

export const useControllerStore = create(
  subscribeWithSelector<ControllerStore>(() => ({ ...initialControllerStore })),
);

useControllerStore.subscribe(
  (state) => state.isPlaying,
  (isPlaying) => {
    if (!isPlaying) {
      resetRuntime();
    }
  },
);

export const activateController = () =>
  useControllerStore.setState({ isPlaying: true });

export const deactivateController = () =>
  useControllerStore.setState({ isPlaying: false });

export const updateSequence = (sequence: ControllerSequenceSetting) =>
  useControllerStore.setState({ sequence });

export const updateRepeatCount = (repeat: number) =>
  useControllerStore.setState((state) => mergeSettings(state, { repeat }));

export const updateTempo = (tempo: number) =>
  useControllerStore.setState((state) =>
    mergeSettings(state, generateTempoSetting(tempo)),
  );

export const updateColorSetting = (
  setting: Partial<ControllerExtraSettings["color"]>,
) => {
  const { mode, data } = setting;
  useControllerStore.setState((state) => {
    const { color } = state.settings;
    const newMode = mode || color.mode;
    const newData = data || color.data;
    return mergeSettings(
      state,
      generateExtraSetting("color", { mode: newMode, data: newData }),
    );
  });
};
