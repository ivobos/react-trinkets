import React, { useEffect, useState } from 'react';

interface PasswordStrengthProps {
    password: string;
}

const PasswordStrengthMeter: React.FC<PasswordStrengthProps> = ({ password }) => {
    const [passwordStrength, setPasswordStrength] = useState(0);

    const calculatePasswordStrength = (password: string) => {
        let strength = 0;

        if (password.length > 0 && password.length <= 4) strength += 1;
        if (password.length > 4 && password.length <= 6) strength += 2;
        if (password.length > 6 && password.length <= 8) strength += 3;
        if (password.length > 8) strength += 4;

        if (password.match(/[a-z]/)) strength += 1;
        if (password.match(/[A-Z]/)) strength += 1;
        if (password.match(/[0-9]/)) strength += 1;
        if (password.match(/[^a-zA-Z0-9]/)) strength += 1;

        setPasswordStrength(strength);
    };

    useEffect(() => {
        calculatePasswordStrength(password);
    }, [password]);

    const getProgressBarColor = () => {
        switch (passwordStrength) {
            case 1:
            case 2:
                return 'red';
            case 3:
            case 4:
                return 'orange';
            case 5:
            case 6:
                return 'green';
            default:
                return 'gray';
        }
    };

    const getProgressBarWidth = () => {
        return (passwordStrength / 6) * 100;
    };

    const getStrengthLabel = () => {
        switch (passwordStrength) {
            case 1:
                return 'Weak';
            case 2:
                return 'Fair';
            case 3:
                return 'Good';
            case 4:
                return 'Strong';
            case 5:
                return 'Very Strong';
            default:
                return '';
        }
    };

    return (
        <div style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{
                width: '100%', height: '10px', backgroundColor: '#ccc',
                borderRadius: '5px', overflow: 'hidden', flex: '1'
            }}>
                <div style={{
                    width: getProgressBarWidth() + "%", height: '100%',
                    backgroundColor: getProgressBarColor(), transition: 'width 0.5s ease-in-out'
                }}
                />
            </div>
            <span style={{ fontSize: '12px', color: '#666', marginLeft: '10px' }}>
                {getStrengthLabel()}
            </span>
        </div>
    );
};

export default PasswordStrengthMeter;