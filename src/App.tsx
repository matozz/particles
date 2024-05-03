import { useState } from "react";

import { useController, useControllerStore } from "./core/controller";
import { sequencePresets } from "./core/sequence";
import { CircleLayout, MatrixLayout } from "./layout";

type Layout =
  | { type: "matrix"; columns: number; rows: number }
  | { type: "circle"; rings: number; increment: number };

const layoutPresets: Record<Layout[keyof Layout], Layout> = {
  matrix: { type: "matrix", columns: 8, rows: 8 },
  circle: { type: "circle", rings: 4, increment: 6 },
};

function App() {
  // Top level controller
  useController();

  const playing = useControllerStore((state) => state.playing);
  const sequence = useControllerStore((state) => state.sequence);
  const settings = useControllerStore((state) => state.settings);
  const start = useControllerStore((state) => state.start);
  const stop = useControllerStore((state) => state.stop);
  const updateTempo = useControllerStore((state) => state.updateTempo);
  const updateSequence = useControllerStore((state) => state.updateSequence);

  const [layout, setLayout] = useState<Layout>(layoutPresets.matrix);

  const getRandomLayout = () => {
    if (layout.type === "matrix") {
      const columns = Math.floor(Math.random() * 12) + 3;
      const rows = Math.floor(Math.random() * 10) + 2;
      setLayout({ type: "matrix", columns, rows });
    } else {
      const rings = Math.floor(Math.random() * 3) + 3;
      const increment = Math.floor(Math.random() * 6) + 4;
      setLayout({ type: "circle", rings, increment });
    }
  };

  return (
    <div className="flex h-screen flex-col items-center justify-center gap-5 bg-[#111] p-10">
      <div className="flex gap-5">
        <button
          className="text-blue-500 underline"
          onClick={playing ? stop : start}
        >
          {playing ? "Pause" : "Play"}
        </button>
        <div className="text-white">{settings.tempo}</div>
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

      <div className="flex gap-2">
        <div className="text-white">{`sequence: `}</div>
        {sequencePresets.map((item) => (
          <button
            key={item.key}
            className={`text-blue-500 ${item.key === sequence ? "underline" : ""}`}
            onClick={() => updateSequence(item.key)}
          >
            {item.key}
          </button>
        ))}
      </div>

      <div className="flex gap-2">
        <div className="text-white">{`layout: `}</div>
        {Object.values(layoutPresets).map((item) => (
          <button
            key={item.type}
            className={`text-blue-500 ${item.type === layout.type ? "underline" : ""}`}
            onClick={() => setLayout(item)}
          >
            {item.type}
          </button>
        ))}
      </div>

      <button className="text-blue-500 underline" onClick={getRandomLayout}>
        Random
      </button>

      {layout.type === "matrix" && (
        <MatrixLayout columns={layout.columns} rows={layout.rows} />
      )}
      {layout.type === "circle" && (
        <CircleLayout rings={layout.rings} increment={layout.increment} />
      )}
    </div>
  );
}

export default App;
