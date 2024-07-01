import { type FC, memo, useCallback, useId } from "react";
import { useBindLayout } from "@/controller";
import SpotlightElement from "@/elements/spotlight";
import "./index.css";

interface MatrixLayoutProps {
  rows: number;
  columns: number;
}

const MatrixLayout: FC<MatrixLayoutProps> = memo((props) => {
  const { rows, columns } = props;

  const layoutId = useId();

  useBindLayout(layoutId, rows * columns);

  const generateMatrix = useCallback(() => {
    const elements: JSX.Element[] = [];
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < columns; j++) {
        elements.push(
          <SpotlightElement
            x={j}
            y={i}
            key={`${i}-${j}`}
            layoutId={layoutId}
          />,
        );
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
