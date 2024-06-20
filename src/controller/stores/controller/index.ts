import { create } from "zustand";

import { subscribeWithSelector } from "zustand/middleware";

import { runtimeReset } from "../runtime";
import {
  ControllerExtraSettings,
  ControllerSequenceSetting,
  ControllerStore,
} from "./types";
import { getExtraSetting, getTempoSetting, mergeSettings } from "./utils";

const initialControllerStore: ControllerStore = {
  playing: false,
  triggerMode: "raf",
  sequence: { type: "flow", options: { density: 0.25 } },
  settings: {
    repeat: 1,
    ...getTempoSetting(128),
    ...getExtraSetting("color", {
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
  (state) => state.playing,
  (playing) => {
    if (!playing) {
      runtimeReset();
    }
  },
);

export const startController = () =>
  useControllerStore.setState({ playing: true });

export const stopController = () =>
  useControllerStore.setState({ playing: false });

export const setSequence = (sequence: ControllerSequenceSetting) =>
  useControllerStore.setState({ sequence });

export const setRepeat = (repeat: number) =>
  useControllerStore.setState((state) => mergeSettings(state, { repeat }));

export const setTempo = (tempo: number) =>
  useControllerStore.setState((state) =>
    mergeSettings(state, getTempoSetting(tempo)),
  );

export const setColor = (
  setting: Partial<ControllerExtraSettings["color"]>,
) => {
  const { mode, data } = setting;
  useControllerStore.setState((state) => {
    const { color } = state.settings;
    const newMode = mode || color.mode;
    const newData = data || color.data;
    return mergeSettings(
      state,
      getExtraSetting("color", { mode: newMode, data: newData }),
    );
  });
};
