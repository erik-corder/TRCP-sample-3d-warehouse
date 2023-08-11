type Draw = {
  ctx: CanvasRenderingContext2D;
  currentPoint: Point;
  prevPoint?: Point;
  rects: Rect[];
};

type Point = { x: number; y: number };
