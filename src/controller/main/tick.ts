import { useControllerStore } from "../stores/controller";
import { useElementStore } from "../stores/element";
import { addAnimationFrame, incrementBeats } from "../stores/runtime";
import {
  requestAnimationFrameTrigger,
  timeoutTrigger,
} from "../utils/tick_helper";
import { handleColor } from "./color";
import { handleRepeat } from "./repeat";

export const handleTick = () => {
  const { triggerMode, settings, sequence } = useControllerStore.getState();
  const { presetMap } = useElementStore.getState();

  const { repeat } = settings;

  if (!presetMap?.[sequence.type]) {
    return;
  }

  // TODO: Sample element groups with excessively short trigger

  let chain = handleRepeat(presetMap[sequence.type]);

  // skip tick if `actions` is empty
  if (chain.actions.length === 0) {
    return;
  }

  chain = handleColor(chain);

  // console.log(chain);

  incrementBeats(repeat >= 2 ? repeat : 1);

  if (triggerMode === "sto") {
    timeoutTrigger({
      settings,
      chain,
      onFrameCreate: (timerId) => addAnimationFrame({ type: "sto", timerId }),
    });
  } else {
    requestAnimationFrameTrigger({
      settings,
      chain,
      onFrameCreate: (rafId) => addAnimationFrame({ type: "raf", rafId }),
    });
  }
};
