import React, { useState, useEffect } from 'react';

interface ClockProps {
    color: string;
    size: number;
}

interface DigitProps {
    value: number;
    color: string;
    size: number;
}

const LCDDigit: React.FC<DigitProps> = ({ value, color, size }) => {
    const segmentWidth = size / 10;
    const segmentHeight = size / 20;
    const segmentSpacing = size / 50;

    const segments = [
        // top
        <rect key="top" x={segmentSpacing} y={0} width={size - 2 * segmentSpacing} height={segmentHeight} fill={value !== 1 && value !== 4 ? color : 'none'} />,
        // top-left
        <rect key="top-left" x={0} y={segmentSpacing} width={segmentWidth} height={size / 2 - 2 * segmentSpacing} fill={value === 0 || value === 4 || value === 5 || value === 6 || value === 8 || value === 9 ? color : 'none'} />,
        // top-right
        <rect key="top-right" x={size - segmentWidth} y={segmentSpacing} width={segmentWidth} height={size / 2 - 2 * segmentSpacing} fill={value !== 5 && value !== 6 ? color : 'none'} />,
        // middle
        <rect key="middle" x={segmentSpacing} y={size / 2 - segmentHeight / 2} width={size - 2 * segmentSpacing} height={segmentHeight} fill={value !== 0 && value !== 1 && value !== 7 ? color : 'none'} />,
        // bottom-left
        <rect key="bottom-left" x={0} y={size / 2 + segmentSpacing} width={segmentWidth} height={size / 2 - 2 * segmentSpacing} fill={value === 0 || value === 2 || value === 6 || value === 8 ? color : 'none'} />,
        // bottom-right
        <rect key="bottom-right" x={size - segmentWidth} y={size / 2 + segmentSpacing} width={segmentWidth} height={size / 2 - 2 * segmentSpacing} fill={value !== 2 ? color : 'none'} />,
        // bottom
        <rect key="bottom" x={segmentSpacing} y={size - segmentHeight} width={size - 2 * segmentSpacing} height={segmentHeight} fill={value !== 1 && value !== 4 && value !== 7 ? color : 'none'} />,
    ];

    return (
        <svg width={size} height={size}>
            {segments}
        </svg>
    );
};

const DigitalClock: React.FC<ClockProps> = ({ color, size }) => {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const intervalId = setInterval(() => {
            setTime(new Date());
        }, 1000);

        return () => {
            clearInterval(intervalId);
        };
    }, []);

    const formatTime = (date: Date) => {
        let hours = date.getHours().toString();
        let minutes = date.getMinutes().toString();
        let seconds = date.getSeconds().toString();

        if (hours.length === 1) hours = '0' + hours;
        if (minutes.length === 1) minutes = '0' + minutes;
        if (seconds.length === 1) seconds = '0' + seconds;

        return `${hours}:${minutes}:${seconds}`;
    };

    return (
        <div style={{ display: 'flex', gap: size / 10 }}>
            {formatTime(time).split('').map((digit, index) => (
                digit === ':' ? (
                    <div key={index} style={{ fontSize: size, color, alignSelf: 'center' }}>:</div>
                ) : (
                    <LCDDigit key={index} value={Number(digit)} color={color} size={size} />
                )
            ))}
        </div>
    );
};

export default DigitalClock;