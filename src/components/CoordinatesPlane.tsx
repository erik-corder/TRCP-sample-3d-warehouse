import React, { FC, useEffect, useRef, useState } from "react";

interface Rectangle {
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;
}

const CoordinatesPlane: FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [rectangles, setRectangles] = useState<Rectangle[]>([]);
  const [isDrawing, setIsDrawing] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startY, setStartY] = useState(0);
  const [selectedColor, setSelectedColor] = useState("#000000");

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    drawGrid(ctx);
    drawRectangles(ctx);
  }, [rectangles]);

  const handleColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedColor(event.target.value);
  };

  const handleMouseDown = (
    event: React.MouseEvent<HTMLCanvasElement, MouseEvent>
  ) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    setIsDrawing(true);
    const canvasX = Math.floor(event.clientX - canvas.offsetLeft - 12);
    const canvasY = Math.floor(event.clientY - canvas.offsetTop - 12);
    setStartX(canvasX);
    setStartY(canvasY);
  };

  const handleMouseMove = (
    event: React.MouseEvent<HTMLCanvasElement, MouseEvent>
  ) => {
    if (!isDrawing) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const canvasX = Math.floor(event.clientX - canvas.offsetLeft - 12);
    const canvasY = Math.floor(event.clientY - canvas.offsetTop - 12);

    const width = canvasX - startX;
    const height = canvasY - startY;

    const temporaryRectangle: Rectangle = {
      x: width >= 0 ? startX : canvasX,
      y: height >= 0 ? startY : canvasY,
      width: Math.abs(width),
      height: Math.abs(height),
      color: selectedColor,
    };

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawGrid(ctx);
    drawRectangles(ctx);

    ctx.fillStyle = temporaryRectangle.color;
    ctx.globalAlpha = 0.5; // Set the overlay transparency
    ctx.fillRect(
      temporaryRectangle.x,
      temporaryRectangle.y,
      temporaryRectangle.width,
      temporaryRectangle.height
    );
    ctx.globalAlpha = 1.0; // Reset the transparency
  };

  const handleMouseUp = (
    event: React.MouseEvent<HTMLCanvasElement, MouseEvent>
  ) => {
    if (isDrawing) {
      setIsDrawing(false);
      const canvas = canvasRef.current;
      if (!canvas) return;

      const canvasX = Math.floor(event.clientX - canvas.offsetLeft - 12);
      const canvasY = Math.floor(event.clientY - canvas.offsetTop - 12);

      const width = canvasX - startX;
      const height = canvasY - startY;

      const newRectangle: Rectangle = {
        x: width >= 0 ? startX : canvasX,
        y: height >= 0 ? startY : canvasY,
        width: Math.abs(width),
        height: Math.abs(height),
        color: selectedColor,
      };

      setRectangles([...rectangles, newRectangle]);
    }
  };

  const drawGrid = (ctx: CanvasRenderingContext2D) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.strokeStyle = "#ddd";
    for (let x = 0; x < ctx.canvas.width; x += 5) {
      ctx.moveTo(x, 0);
      ctx.lineTo(x, ctx.canvas.height);

      ctx.moveTo(0, x);
      ctx.lineTo(ctx.canvas.width, x);

      ctx.strokeStyle = "#d2c3e6";
      ctx.lineWidth = 0.5;
      ctx.stroke();
    }

    ctx.beginPath();
    for (let x = 0; x < ctx.canvas.width; x += 25) {
      ctx.moveTo(x, 0);
      ctx.lineTo(x, ctx.canvas.height);

      ctx.moveTo(0, x);
      ctx.lineTo(ctx.canvas.width, x);

      ctx.strokeStyle = "#bc94f2";
      ctx.lineWidth = 1;
      ctx.stroke();
    }

    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(ctx.canvas.width, 0);
    ctx.moveTo(0, 0);
    ctx.lineTo(0, ctx.canvas.height);

    for (let x = 0; x < ctx.canvas.width; x += 25) {
      ctx.moveTo(x, 0);
      ctx.lineTo(x, 5);
      ctx.fillStyle = "#000000";
      ctx.fillText(x.toString(), x, 15);
    }

    for (let y = 0; y < ctx.canvas.height; y += 25) {
      ctx.moveTo(0, y);
      ctx.lineTo(5, y);
      ctx.fillStyle = "#000000";
      ctx.fillText(y.toString(), 10, y);
    }

    ctx.strokeStyle = "red";
    ctx.lineWidth = 1;
    ctx.stroke();
  };

  const drawRectangles = (ctx: CanvasRenderingContext2D) => {
    rectangles.forEach((rectangle) => {
      ctx.fillStyle = rectangle.color;
      ctx.globalAlpha = 0.5; // Set the overlay transparency
      ctx.fillRect(rectangle.x, rectangle.y, rectangle.width, rectangle.height);
      ctx.globalAlpha = 1.0; // Reset the transparency
    });
  };

  return (
    <div className="flex flex-col items-center gap-4 overflow-hidden bg-white">
      <input type="color" value={selectedColor} onChange={handleColorChange} />
      <canvas
        ref={canvasRef}
        id="coordinatePlane"
        width={900}
        height={600}
        className="border-[1px] border-green-700 p-3"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseOut={handleMouseUp}
      />
    </div>
  );
};

export default CoordinatesPlane;
