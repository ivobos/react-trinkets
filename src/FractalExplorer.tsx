import React, { useEffect, useRef, useState } from 'react';

interface Point {
    x: number;
    y: number;
}

interface FractalProps {
    width: number;
    height: number;
}

const FractalExplorer: React.FC<FractalProps> = ({ width, height }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [center, setCenter] = useState<Point>({ x: -0.5, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [dragging, setDragging] = useState(false);
    const [dragStart, setDragStart] = useState<Point>({ x: 0, y: 0 });
    const preventWheelDefault = function (e: any) {
        e.preventDefault();
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext('2d');
        if (ctx) {
            drawFractal(ctx);
        }
    }, [center, zoom]);

    // react doesn't allow prevent default for canvas.onWheel, because it registers it
    // as a passive listener, so here we use react escape hatch and prevent default manually
    useEffect(() => {
        const canvas = canvasRef.current;
        canvas?.addEventListener("wheel", preventWheelDefault, { passive: false });
        return () => canvas?.removeEventListener("wheel", preventWheelDefault);
    }, [canvasRef]);

    const drawFractal = (ctx: CanvasRenderingContext2D) => {
        const imageData = ctx.createImageData(width, height);
        const data = imageData.data;

        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                const i = (x + y * width) * 4;
                const real = center.x + (x - width / 2) / (zoom * width / 4);
                const imag = center.y + (y - height / 2) / (zoom * height / 4);
                const iterations = iterateMandelbrot(real, imag, 100);
                const color = getColor(iterations);
                data[i] = color[0];
                data[i + 1] = color[1];
                data[i + 2] = color[2];
                data[i + 3] = 255;
            }
        }

        ctx.putImageData(imageData, 0, 0);
    };

    const iterateMandelbrot = (real: number, imag: number, maxIterations: number) => {
        let r = real;
        let i = imag;
        let iterations = 0;

        while (r * r + i * i < 4 && iterations < maxIterations) {
            const temp = r * r - i * i + real;
            i = 2 * r * i + imag;
            r = temp;
            iterations++;
        }

        return iterations;
    };

    const getColor = (iterations: number) => {
        if (iterations === 100) {
            return [0, 0, 0]; // black
        } else {
            const colorIndex = Math.floor((iterations / 100) * 256);
            return [colorIndex, 0, 255 - colorIndex]; // gradient from red to blue
        }
    };

    const handleMouseDown = (event: React.MouseEvent<HTMLCanvasElement>) => {
        event.preventDefault();
        setDragging(true);
        setDragStart({ x: event.clientX, y: event.clientY });
    };

    const handleMouseMove = (event: React.MouseEvent<HTMLCanvasElement>) => {
        if (dragging) {
            const newCenter = {
                x: center.x - (event.clientX - dragStart.x) / (zoom * width / 4),
                y: center.y - (event.clientY - dragStart.y) / (zoom * height / 4),
            };
            setCenter(newCenter);
            setDragStart({ x: event.clientX, y: event.clientY });
        }
    };

    const handleMouseUp = () => {
        setDragging(false);
    };

    const handleWheel = (event: React.WheelEvent<HTMLCanvasElement>) => {
        // note: prevent default done in preventWheelDefault because its not possible here
        const newZoom = Math.max(1, zoom + event.deltaY / 100);
        setZoom(newZoom);
    };

    const handleLeftClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
        event.preventDefault();
        const rect = canvasRef.current?.getBoundingClientRect();
        if (rect) {
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;
            const newCenter = {
                x: center.x + (x - width / 2) / (zoom * width / 4),
                y: center.y + (y - height / 2) / (zoom * height / 4),
            };
            setCenter(newCenter);
            setZoom(zoom * 2);
        }
    };

    const handleRightClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
        event.preventDefault();
        const rect = canvasRef.current?.getBoundingClientRect();
        if (rect) {
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;
            const newCenter = {
                x: center.x + (x - width / 2) / (zoom * width / 4),
                y: center.y + (y - height / 2) / (zoom * height / 4),
            };
            setCenter(newCenter);
            setZoom(Math.max(1, zoom / 2));
        }
    };

    return (
        <canvas
            ref={canvasRef}
            width={width}
            height={height}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onWheel={handleWheel}
            onClick={handleLeftClick}
            onContextMenu={handleRightClick}
        />
    );
};

export default FractalExplorer;