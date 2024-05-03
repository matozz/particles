import { memo, useCallback, useId, useMemo } from "react";

import { useBindLayout } from "@/core/controller";
import SpotlightElement from "@/elements/spotlight";

import "./index.css";

interface CircleLayoutProps {
  rings: number;
  increment: number;
  gap?: number;
}

const CircleLayout: React.FC<CircleLayoutProps> = memo((props) => {
  const { rings, increment, gap = 40 } = props;

  const id = useId();

  const calcRings = rings - 1;

  const totalElements = useMemo(() => {
    let totalElements = 1;
    for (let ringIdx = 1; ringIdx <= calcRings; ringIdx++) {
      totalElements += increment * ringIdx;
    }
    return totalElements;
  }, [increment, calcRings]);

  useBindLayout(id, totalElements);

  const generateElements = useCallback(
    (total: number) => {
      const elements = [{ x: 0, y: 0 }];
      let currentRadius = gap;

      for (let ringIdx = 1; ringIdx <= calcRings; ringIdx++) {
        const numberOfElements = increment * ringIdx;
        for (let elementIdx = 0; elementIdx < numberOfElements; elementIdx++) {
          elements.push(
            calculatePosition(elementIdx, numberOfElements, currentRadius),
          );
        }
        currentRadius += gap;
      }
      return elements.slice(0, total);
    },
    [increment, calcRings],
  );

  const calculatePosition = useCallback(
    (index: number, totalElements: number, radius: number) => {
      const angle = (index / totalElements) * (2 * Math.PI);
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;
      return { x, y };
    },
    [],
  );

  const calculateDiameter = () => {
    const outerRadius = gap * rings;
    const diameter = outerRadius * 2;
    return diameter;
  };

  if (rings < 1) {
    return null;
  }

  const diameter = calculateDiameter();

  return (
    <div
      className="circle-layout relative"
      style={{
        width: `${diameter}px`,
        height: `${diameter}px`,
      }}
    >
      {generateElements(totalElements).map((position, index) => (
        <div
          key={index}
          className="circle-element absolute"
          style={{
            left: `calc(50% + ${position.x}px)`,
            top: `calc(50% + ${position.y}px)`,
            transform: "translate(-50%, -50%)",
          }}
        >
          <SpotlightElement
            key={`${position.x}-${position.y}`}
            x={position.x}
            y={position.y}
          />
        </div>
      ))}
    </div>
  );
});

export default CircleLayout;
