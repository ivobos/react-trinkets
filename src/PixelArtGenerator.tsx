import React, { MouseEvent, useEffect, useState } from 'react';

interface Props {
    size: number; // In pixels
    pixelWidth: number; // In pixels
    pixelHeight: number; // In pixels
}

const PixelArtGenerator: React.FC<Props> = ({
    size = 500,
    pixelWidth = 20,
    pixelHeight = 20,
}) => {
    const [selectedColor, setSelectedColor] = useState('#000000');
    const [pixelArt, setPixelArt] = useState<Array<Array<string>>>(() => {
        try {
            const storedPixelArt = localStorage.getItem('pixelArt');
            if (storedPixelArt) {
                return JSON.parse(storedPixelArt);
            } else {
                return Array(pixelHeight).fill(Array(pixelWidth).fill('#FFFFFF'));
            }
        } catch (error) {
            console.error('Error loading pixel art from local storage:', error);
            return Array(pixelHeight).fill(Array(pixelWidth).fill('#FFFFFF'));
        }
    });
    const [isMouseDown, setIsMouseDown] = useState(false);

    useEffect(() => {
        try {
            localStorage.setItem('pixelArt', JSON.stringify(pixelArt));
        } catch (error) {
            console.error('Error saving pixel art to local storage:', error);
        }
    }, [pixelArt]);

    const handlePixelMouseDown = (rowIndex: number, columnIndex: number) => {
        setIsMouseDown(true);
        handlePixelClick(rowIndex, columnIndex);
    };

    const handlePixelMouseUp = () => {
        setIsMouseDown(false);
    };

    const handlePixelMouseMove = (e: MouseEvent, rowIndex: number, columnIndex: number) => {
        if (e.buttons === 1) {
            handlePixelClick(rowIndex, columnIndex);
        }
    };

    const handlePixelClick = (rowIndex: number, columnIndex: number) => {
        const newPixelArt = pixelArt.map((row, i) => {
            if (i === rowIndex) {
                return row.map((cell, j) => {
                    if (j === columnIndex) {
                        return selectedColor;
                    } else {
                        return cell;
                    }
                });
            } else {
                return row;
            }
        });
        setPixelArt(newPixelArt);
    };

    const handleColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedColor(event.target.value);
    };

    const handleCopyToClipboard = () => {
        const canvas = document.createElement('canvas');
        canvas.width = pixelWidth;
        canvas.height = pixelHeight;
        const ctx = canvas.getContext('2d');
        if (ctx) {
            pixelArt.forEach((row, rowIndex) => {
                row.forEach((cell, columnIndex) => {
                    ctx.fillStyle = cell;
                    ctx.fillRect(columnIndex, rowIndex, 1, 1);
                });
            });
            canvas.toBlob((blob) => {
                if (blob) {
                    navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })]).catch((error) => {
                        console.error('Error copying pixel art to clipboard:', error);
                    });
                }
            });
        }
    };
    const copyToClipboarStyles = {
        backgroundColor: '#4CAF50', /* Green */
        border: 'none',
        color: 'white',
        padding: '15px 32px',
        // textAlign: 'center',
        textDecoration: 'none',
        display: 'inline-block',
        fontSize: '16px',
        cursor: 'pointer', // Optional: Indicate clickable behavior
        marginTop: '16px'
    };
    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', }}>
            <input type="color" style={{ marginBottom: '16px' }} value={selectedColor} onChange={handleColorChange} />
            <div style={{ display: 'flex', flexDirection: 'column', }}>
                {pixelArt.map((row, rowIndex) => (
                    <div key={rowIndex} style={{ display: 'flex' }}>
                        {row.map((cell, columnIndex) => (
                            <div style={{ width: `${size}px`, height: `${size}px`, border: '1px solid black', backgroundColor: cell }}
                                key={columnIndex}
                                onMouseDown={() => handlePixelMouseDown(rowIndex, columnIndex)}
                                onMouseUp={handlePixelMouseUp}
                                onMouseMove={(e) => handlePixelMouseMove(e, rowIndex, columnIndex)}
                            />
                        ))}
                    </div>
                ))}
            </div>
            <button onClick={handleCopyToClipboard} style={copyToClipboarStyles}>Copy to Clipboard</button>
        </div>
    );
};

export default PixelArtGenerator;
