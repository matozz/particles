type SchedulerHookOptions = {
  onTick: (options: { stopRef: React.MutableRefObject<boolean> }) => void;
};

export type SchedulerHookReturn = {
  start: () => void;
  stop: () => void;
};

export type SchedulerHook = (
  interval: number,
  options?: SchedulerHookOptions,
) => SchedulerHookReturn;
