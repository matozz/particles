export enum BaseDirection {
  LeftRight = "lr",
  RightLeft = "rl",
  TopBottom = "tb",
  BottomTop = "bt",
  TopLeftBottomRight = "tlbr",
  TopRightBottomLeft = "trbl",
  BottomLeftTopRight = "bltr",
  BottomRightTopLeft = "brtl",
  CenterLeftRight = "clr",
  CenterTopBottom = "ctb",
  LeftRightCenter = "lrc",
  TopBottomCenter = "tbc",
}

export enum BasePoint {
  Center = "c",
  TopLeft = "tl",
  TopCenter = "tc",
  TopRight = "tr",
  LeftCenter = "lc",
  BottomLeft = "bl",
  BottomCenter = "bc",
  BottomRight = "br",
  RightCenter = "rc",
}

export enum ZoomDirection {
  ZoomOut = "zo",
  ZoomIn = "zi",
}

export enum RotateDirection {
  ClockWise = "cw",
  CounterClockWise = "ccw",
}

export type LayoutCategories = typeof layoutCategories;
export type LayoutType = keyof LayoutCategories;

export const layoutCategories = {
  flow: {
    direction: [
      BaseDirection.LeftRight,
      BaseDirection.RightLeft,
      BaseDirection.TopBottom,
      BaseDirection.BottomTop,
      BaseDirection.BottomLeftTopRight,
      BaseDirection.BottomRightTopLeft,
      BaseDirection.TopLeftBottomRight,
      BaseDirection.TopRightBottomLeft,
      BaseDirection.CenterLeftRight,
      BaseDirection.LeftRightCenter,
      BaseDirection.CenterTopBottom,
      BaseDirection.TopBottomCenter,
    ] as const,
  },
  zoom: {
    direction: [ZoomDirection.ZoomOut, ZoomDirection.ZoomIn] as const,
    points: [
      BasePoint.Center,
      BasePoint.TopLeft,
      // BasePoint.TopCenter,
      BasePoint.TopRight,
      // BasePoint.LeftCenter,
      BasePoint.BottomLeft,
      // BasePoint.BottomCenter,
      BasePoint.BottomRight,
      // BasePoint.RightCenter,
    ] as const,
  },
  rotate: {
    direction: [
      RotateDirection.ClockWise,
      RotateDirection.CounterClockWise,
    ] as const,
    points: [
      BasePoint.Center,
      BasePoint.TopLeft,
      // BasePoint.TopCenter,
      BasePoint.TopRight,
      // BasePoint.LeftCenter,
      BasePoint.BottomLeft,
      // BasePoint.BottomCenter,
      BasePoint.BottomRight,
      // BasePoint.RightCenter,
    ] as const,
  },
};
