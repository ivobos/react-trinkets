import React, { useEffect, useState } from 'react';

interface ColorPickerProps {
    onColorSelect?: (color: string) => void;
}

const ColorPicker: React.FC<ColorPickerProps> = ({ onColorSelect }) => {
    const [selectedColor, setSelectedColor] = useState('');
    const [showNotification, setShowNotification] = useState(false);

    useEffect(() => {
        if (showNotification) {
            const timeoutId = setTimeout(() => {
                setShowNotification(false);
            }, 2000);
            return () => {
                clearTimeout(timeoutId);
            };
        }
        return;
    }, [showNotification]);

    const handleColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const color = event.target.value;
        setSelectedColor(color);
        if (onColorSelect) {
            onColorSelect(color);
        }
        navigator.clipboard.writeText(color).then(() => {
            setShowNotification(true);
        }).catch(() => console.log('Failed to copy to clipboard'));
    };

    return (
        <div style={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
            <input style={{
                width: '50px',
                height: '50px',
                border: 'none',
                padding: 0,
                margin: 0,
                borderRadius: '50%',
                overflow: 'hidden',
                cursor: 'poiner'
            }} type="color" value={selectedColor} onChange={handleColorChange} />
            <div style={{ marginLeft: '10px', fontWeight: 'bold', fontSize: '18px' }}>{selectedColor}</div>
            {showNotification && <div style={{
                position: 'absolute', top: 0, right: 0, padding: '10px', backgroundColor: '#ccc',
                borderRadius: '10px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)'
            }}>Copied to clipboard!</div>}
        </div>
    );
};


export default ColorPicker;
