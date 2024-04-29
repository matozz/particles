type SchedulerHookOptions = { onTick: () => void };

export type SchedulerHookReturn = {
  start: () => void;
  stop: () => void;
};

export type SchedulerHook = (
  interval: number,
  options?: SchedulerHookOptions,
) => SchedulerHookReturn;
