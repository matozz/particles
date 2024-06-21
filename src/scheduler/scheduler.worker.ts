let expectedTime = 0;
let interval = 1000;
let timer: NodeJS.Timeout | undefined;

const tick = () => {
  const currentTime = performance.now();

  if (currentTime >= expectedTime) {
    postMessage("tick");
    const offset = currentTime - expectedTime;
    const duration = interval - offset;
    expectedTime = currentTime + duration;

    timer = setTimeout(tick, duration);
  } else {
    const duration = expectedTime - currentTime;
    timer = setTimeout(tick, duration);
  }
};

onmessage = (e) => {
  switch (e.data.action) {
    case "start":
      interval = e.data.interval;
      expectedTime = performance.now() + interval;
      postMessage("tick");
      tick();
      break;
    case "stop":
      clearTimeout(timer);
      break;
    case "interval":
      interval = e.data.interval;
      break;
    default:
      break;
  }
};
