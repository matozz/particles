type SchedulerHookOptions = { onTick: () => void };

type SchedulerHookReturn = {
  playing: boolean;
  start: () => void;
  stop: () => void;
};

export type SchedulerHook = (
  interval: number,
  options: SchedulerHookOptions,
) => SchedulerHookReturn;
