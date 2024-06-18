import React, { useEffect, useState } from 'react';
import logo from "./goldfish.webp";

interface Props {
    width?: number;
    height?: number;
}

const Aquarium: React.FC<Props> = ({ width = 200, height = 150 }) => {
    const [dx, setDx] = useState(1);
    const [dy, setDy] = useState(1);
    const [x, setX] = useState(10);
    const [y, setY] = useState(10);

    useEffect(() => {
        const interval = setInterval(() => {
            const newX = x + dx;
            const newY = y + dy;

            if (newX < 3 || newX > width - 55) {
                setDx(- dx);
            } else {
                setX(newX);
            }
            if (newY < 2 || newY > height - 50) {
                setDy(- dy);
            } else {
                setY(newY);
            }
        }, 16); // 16ms = 60fps

        return () => clearInterval(interval);
    }, [dx, dy, x, y, width, height]);

    return (
        <div style={{
            width: `${width}px`,
            height: `${height}px`,
            border: '1px solid black',
            position: 'relative',
            overflow: 'hidden',
        }}>
            <div style={{
                width: '100%',
                height: '100%',
                backgroundImage: 'linear-gradient(to bottom, #3498db, #2ecc71)',
            }} />
            <GoldfishImage x={x} y={y} dx={dx} />
        </div>
    );
};

const GoldfishImage: React.FC<{ x: number, y: number, dx: number }> = (props: { x: number, y: number, dx: number }) => (
    <img style={{
        width: '55px',
        height: '50px',
        position: 'absolute',
        top: `${props.y}px`,
        left: `${props.x}px`,
        transform: props.dx < 0 ? 'scaleX(1)' : 'scaleX(-1)',
    }} src={logo} />
);

export default Aquarium;