import React, { useEffect, useState } from 'react';

const PrimeNumberCheck: React.FC = () => {
    const [number, setNumber] = useState<number>(0);
    const [isPrime, setIsPrime] = useState<boolean | null>(null);

    useEffect(() => {
        if (number <= 1) {
            setIsPrime(false);
            return;
        }
        for (let i = 2; i <= Math.sqrt(number); i++) {
            if (number % i === 0) {
                setIsPrime(false);
                return;
            }
        }
        setIsPrime(true);
    }, [number]); // Trigger effect whenever 'number' changes

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '20px',
            border: '1px solid #ccc',
            borderRadius: '5px'
        }}>
            <h2>Prime Number Checker</h2>
            <input style={{
                padding: '10px',
                marginBottom: '10px',
                border: '1px solid #ccc',
                borderRadius: '3px',
            }}
                type="number"
                value={number}
                onChange={(e) => setNumber(parseInt(e.target.value))}
            />

            {isPrime !== null && (
                <p style={{
                    fontWeight: 'bold',
                    color: isPrime ? 'green' : isPrime === false ? 'red' : 'black',
                }}>
                    {number} is {isPrime ? 'a prime number' : 'not a prime number'}
                </p>
            )}
        </div>
    );
};

export default PrimeNumberCheck;