import React, { useState, useEffect } from 'react';

interface SierpinskiTriangleProps {
    width?: number;
    height?: number;
    depth?: number;
}

const SierpinskiTriangle: React.FC<SierpinskiTriangleProps> = ({
                                                                   width = 100,
                                                                   height = 100,
                                                                   depth = 5,
                                                               }) => {
    const [maxTriangles, setMaxTriangles] = useState(1);

    useEffect(() => {
        let count = 1;
        const intervalId = setInterval(() => {
            setMaxTriangles(count);
            count = (count % (Math.pow(3, depth) - 1)) + 1;
        }, 100);

        return () => clearInterval(intervalId);
    }, [depth]);

    const colors = [
        'red',
        'orange',
        'yellow',
        'green',
        'blue',
        'indigo',
        'violet',
    ];

    const drawTriangle = (x: number, y: number, size: number, level: number, count: number) => {
        if (level === 0 || count >= maxTriangles) return;

        const color1 = colors[level % colors.length];
        const color2 = colors[(level + 1) % colors.length];
        const gradientId = `gradient-${level}`;

        return (
            <g>
                <defs>
                    <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor={color1} stopOpacity="1" />
                        <stop offset="100%" stopColor={color2} stopOpacity="1" />
                    </linearGradient>
                </defs>
                <polygon
                    points={`${x},${y} ${x + size},${y} ${x + size / 2},${y + size * Math.sqrt(3) / 2}`}
                    fill={`url(#${gradientId})`}
                />
                {drawTriangle(x, y, size / 2, level - 1, count + 1)}
                {drawTriangle(x + size / 2, y, size / 2, level - 1, count + 2)}
                {drawTriangle(x + size / 4, y + size * Math.sqrt(3) / 4, size / 2, level - 1, count + 3)}
            </g>
        );
    };

    return (
        <svg width={width} height={height}>
            {drawTriangle(0, 0, width, depth, 1)}
        </svg>
    );
};

export default SierpinskiTriangle;