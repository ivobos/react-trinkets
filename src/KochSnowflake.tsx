import React, { useState, MouseEvent } from 'react';

interface KochSnowflakeProps {
    width?: number;
    height?: number;
}

const KochSnowflake: React.FC<KochSnowflakeProps> = ({ width = 100, height = 100 }) => {
    const [stages, setStages] = useState(3);
    const [center, setCenter] = useState({ x: width / 2, y: height / 2 });

    const handleOnClick = (event: MouseEvent<SVGSVGElement>) => {
        setStages(stages + 1);
        setCenter({ x: event.clientX, y: event.clientY });
    };

    const kochCurve = (x1: number, y1: number, x2: number, y2: number, stages: number): string => {
        if (stages === 0) {
            return `L ${x2} ${y2}`;
        }

        const x3 = x1 + (x2 - x1) / 3;
        const y3 = y1 + (y2 - y1) / 3;
        const x4 = (x1 + x2) / 2 + (y2 - y1) * Math.sqrt(3) / 6;
        const y4 = (y1 + y2) / 2 - (x2 - x1) * Math.sqrt(3) / 6;
        const x5 = x1 + 2 * (x2 - x1) / 3;
        const y5 = y1 + 2 * (y2 - y1) / 3;

        return `${kochCurve(x1, y1, x3, y3, stages - 1)} 
            ${kochCurve(x3, y3, x4, y4, stages - 1)} 
            ${kochCurve(x4, y4, x5, y5, stages - 1)} 
            ${kochCurve(x5, y5, x2, y2, stages - 1)}`;
    };

    const getPath = (): string => {
        const size = Math.min(width, height);
        const x1 = center.x + size / 2;
        const y1 = center.y;
        const x2 = center.x - size / 2;
        const y2 = center.y;

        return `M ${x1} ${y1} 
            ${kochCurve(x1, y1, x2, y2, stages)} 
            ${kochCurve(x2, y2, x1, y1, stages)}`;
    };

    return (
        <svg width={width} height={height} onClick={handleOnClick}>
            <path d={getPath()} stroke="black" strokeWidth="1" fill="none" />
        </svg>
    );
};

export default KochSnowflake;