import { useState } from "react";

import {
  useGlobalController,
  useControllerStore,
  sequencePresets,
} from "./core/controller";
import { CircleLayout, MatrixLayout } from "./layout";

type Layout =
  | { type: "matrix"; columns: number; rows: number }
  | { type: "circle"; rings: number; increment: number };

const layoutPresets: Record<Layout[keyof Layout], Layout> = {
  matrix: { type: "matrix", columns: 12, rows: 6 },
  circle: { type: "circle", rings: 4, increment: 6 },
};

function App() {
  useGlobalController();

  const playing = useControllerStore((state) => state.playing);
  const sequence = useControllerStore((state) => state.sequence);
  const settings = useControllerStore((state) => state.settings);

  const start = useControllerStore((state) => state.start);
  const stop = useControllerStore((state) => state.stop);
  const updateTempo = useControllerStore((state) => state.updateTempo);
  const updateSequence = useControllerStore((state) => state.updateSequence);
  const updateRepeat = useControllerStore((state) => state.updateRepeat);
  const updateColor = useControllerStore((state) => state.updateColor);

  const [layout, setLayout] = useState<Layout>(layoutPresets.matrix);

  const getRandomLayout = () => {
    if (layout.type === "matrix") {
      const columns = Math.floor(Math.random() * 15) + 3;
      const rows = Math.floor(Math.random() * 8) + 2;
      setLayout({ type: "matrix", columns, rows });
    } else {
      const rings = Math.floor(Math.random() * 3) + 3;
      const increment = Math.floor(Math.random() * 3) + 4;
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

      <div className="flex flex-wrap justify-center gap-2">
        <div className="text-white">{`sequence: `}</div>
        {Object.keys(sequencePresets).map((type) => (
          <button
            key={type}
            disabled={type === sequence.type}
            className={`text-blue-500 ${type === sequence.type ? "underline" : ""}`}
            onClick={() => updateSequence({ type })}
          >
            {type}
          </button>
        ))}
      </div>

      <div className="flex flex-wrap justify-center gap-8">
        <div className="flex flex-wrap gap-2">
          <div className="text-white">{`color mode: `}</div>
          {["static", "gradient-auto", "gradient-layout"].map((mode) => (
            <button
              key={mode}
              disabled={mode === settings.color.mode}
              className={`text-blue-500 ${mode === settings.color.mode ? "underline" : ""}`}
              onClick={() => updateColor({ mode })}
            >
              {mode}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap gap-2">
          <div className="text-white">{`repeater: `}</div>
          {[0.25, 0.5, 1, 2, 3].map((repeat) => (
            <button
              key={repeat}
              disabled={repeat === settings.repeat}
              className={`text-blue-500 ${repeat === settings.repeat ? "underline" : ""}`}
              onClick={() => updateRepeat(repeat)}
            >
              {repeat}
            </button>
          ))}
        </div>
      </div>

      <div className="flex gap-8">
        <div className="flex gap-2">
          <div className="text-white">{`layout: `}</div>
          {Object.values(layoutPresets).map((item) => (
            <button
              key={item.type}
              disabled={item.type === layout.type}
              className={`text-blue-500 ${item.type === layout.type ? "underline" : ""}`}
              onClick={() => setLayout(item)}
            >
              {item.type}
            </button>
          ))}
        </div>
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
