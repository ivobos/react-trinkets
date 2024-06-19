import React, { useEffect, useRef, useState } from 'react';

interface BubbleSortVisualizationProps {
    speed?: number;
}

const BubbleSortVisualiser: React.FC<BubbleSortVisualizationProps> = ({
    speed = 20,
}) => {
    const [dataset, setDataset] = useState<number[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [j, setJ] = useState(0);
    const [isSorting, setIsSorting] = useState(false);
    const [isSorted, setIsSorted] = useState(false);
    const parentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const generateDataset = () => {
            if (parentRef.current) {
                const parentWidth = parentRef.current.offsetWidth;
                const parentHeight = parentRef.current.offsetHeight;
                const dataPoints = Math.floor(parentWidth / 10); // assuming 10px width for each bar
                const randomDataset: number[] = [];
                for (let i = 0; i < dataPoints; i++) {
                    randomDataset.push(Math.floor(Math.random() * parentHeight) + 1);
                }
                setDataset(randomDataset);
            }
        };
        generateDataset();
    }, []);

    useEffect(() => {
        let timeout: number;
        if (isSorting) {
            const bubbleSort = () => {
                if (currentIndex < dataset.length - 1) {
                    if (j < dataset.length - currentIndex - 1) {
                        if (dataset[j] > dataset[j + 1]) {
                            const temp = dataset[j];
                            dataset[j] = dataset[j + 1];
                            dataset[j + 1] = temp;
                            setDataset([...dataset]);
                        }
                        setJ(j + 1);
                    } else {
                        setJ(0);
                        setCurrentIndex(currentIndex + 1);
                    }
                } else {
                    setIsSorting(false);
                    setIsSorted(true);
                }
            };
            timeout = window.setTimeout(bubbleSort, speed); // use the speed prop as the timeout delay
        }
        return () => clearTimeout(timeout);
    }, [isSorting, currentIndex, j, dataset, speed]);

    const handleStartSorting = () => {
        setIsSorting(true);
    };

    const handleGenerateNewDataset = () => {
        setIsSorted(false);
        setCurrentIndex(0);
        setJ(0);
        if (parentRef.current) {
            const parentWidth = parentRef.current.offsetWidth;
            const parentHeight = parentRef.current.offsetHeight;
            const dataPoints = Math.floor(parentWidth / 10); // assuming 10px width for each bar
            const randomDataset: number[] = [];
            for (let i = 0; i < dataPoints; i++) {
                randomDataset.push(Math.floor(Math.random() * parentHeight) + 1);
            }
            setDataset(randomDataset);
        }
    };

    return (
        <div ref={parentRef} style={{ position: 'relative', height: '100%' }}>
            {!isSorting && !isSorted && (
                <button
                    onClick={handleStartSorting}
                    style={{ position: 'absolute', top: 0, left: 0 }}
                >
                    Start Sorting
                </button>
            )}
            {isSorted && (
                <button
                    onClick={handleGenerateNewDataset}
                    style={{ position: 'absolute', top: 0, left: 0 }}
                >
                    Generate New Dataset
                </button>
            )}
            <div style={{ display: 'flex', height: '100%', alignItems: 'flex-end' }}>
                {dataset.map((value, index) => (
                    <div
                        key={index}
                        style={{
                            width: '10px',
                            height: `${value}px`,
                            backgroundColor: index === j ? 'red' : 'blue',
                            margin: '1px',
                        }}
                    />
                ))}
            </div>
        </div>
    );
};

export default BubbleSortVisualiser;
