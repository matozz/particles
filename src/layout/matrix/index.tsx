import { memo, useCallback, useId } from "react";

import { useBindLayout } from "@/core/controller";
import SpotlightElement from "@/elements/spotlight";

import "./index.css";

interface MatrixLayoutProps {
  rows: number;
  columns: number;
}

const MatrixLayout: React.FC<MatrixLayoutProps> = memo((props) => {
  const { rows, columns } = props;

  const id = useId();

  useBindLayout(id, rows * columns);

  const generateMatrix = useCallback(() => {
    const elements: JSX.Element[] = [];
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < columns; j++) {
        elements.push(<SpotlightElement key={`${i}-${j}`} x={j} y={i} />);
      }
    }
    return elements;
  }, [rows, columns]);

  return (
    <div
      className="matrix-layout grid justify-start gap-3 bg-[#222] p-3"
      style={{
        gridTemplateColumns: `repeat(${columns}, auto)`,
      }}
    >
      {generateMatrix()}
    </div>
  );
});

export default MatrixLayout;
