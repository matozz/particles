export type SchedulerHookReturn = {
  start: () => void;
  stop: () => void;
};

export type SchedulerHook = (
  interval: number,
  onTick?: () => void,
) => SchedulerHookReturn;
