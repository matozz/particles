import { useEffect, useState } from "react";

import {
  useController,
  useControllerStore,
  useElementStore,
} from "./core/controller";
import { MatrixLayout } from "./layout";

function App() {
  // Top level controller
  useController();

  const playing = useControllerStore((state) => state.playing);
  const settings = useControllerStore((state) => state.settings);
  const start = useControllerStore((state) => state.start);
  const stop = useControllerStore((state) => state.stop);
  const updateTempo = useControllerStore((state) => state.updateTempo);

  const elements = useElementStore((state) => state.elementMap);

  const [layout, setLayout] = useState({ columns: 10, rows: 5 });

  const getRandomLayout = () => {
    const columns = Math.floor(Math.random() * 10) + 3;
    const rows = Math.floor(Math.random() * 4) + 2;
    setLayout({ columns, rows });
  };

  useEffect(() => console.log(elements), [elements]);

  return (
    <div className="flex flex-col items-center justify-center gap-5 p-10">
      <div className="flex gap-5">
        <button
          className="text-blue-500 underline"
          onClick={playing ? stop : start}
        >
          {playing ? "Pause" : "Play"}
        </button>
        <div>{settings.tempo}</div>
        <button
          className="text-blue-500 underline"
          onClick={() => updateTempo(settings.tempo - 10)}
        >
          -
        </button>
        <button
          className="text-blue-500 underline"
          onClick={() => updateTempo(settings.tempo + 10)}
        >
          +
        </button>
      </div>
      <button className="text-blue-500 underline" onClick={getRandomLayout}>
        Random
      </button>

      <MatrixLayout columns={layout.columns} rows={layout.rows} />
    </div>
  );
}

export default App;
