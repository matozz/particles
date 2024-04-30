import { memo, useCallback } from "react";

import SquareElement from "@/elements/square";

import "./index.css";

interface MatrixProps {
  rows: number;
  columns: number;
}

const Matrix: React.FC<MatrixProps> = memo((props) => {
  const { rows, columns } = props;

  const generateMatrix = useCallback(() => {
    const elements: JSX.Element[] = [];
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < columns; j++) {
        elements.push(<SquareElement key={`${i}-${j}`} x={j} y={i} />);
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

export default Matrix;
