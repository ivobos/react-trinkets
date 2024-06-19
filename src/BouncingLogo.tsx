import React, { useRef, useEffect } from 'react';

interface BouncingLogoProps {
    children: React.ReactNode;
}

const BouncingLogo: React.FC<BouncingLogoProps> = ({ children }) => {
    const ref = useRef<HTMLDivElement>(null);
    let x = 0;
    let y = 0;
    let dx = 1;
    let dy = 1;

    useEffect(() => {
        const animate = () => {
            if (ref.current) {
                const rect = ref.current.getBoundingClientRect();
                const parentRect = ref.current.parentElement?.getBoundingClientRect();

                if (parentRect) {
                    x += dx;
                    y += dy;

                    // Ensure the logo is contained within the parent component
                    x = Math.max(0, Math.min(x, parentRect.width - rect.width));
                    y = Math.max(0, Math.min(y, parentRect.height - rect.height));

                    // Update the direction if the logo hits the edge
                    if (x === 0 || x === parentRect.width - rect.width) {
                        dx *= -1;
                    }
                    if (y === 0 || y === parentRect.height - rect.height) {
                        dy *= -1;
                    }

                    ref.current.style.transform = `translate(${x}px, ${y}px)`;
                }
            }

            requestAnimationFrame(animate);
        };

        animate();

        const handleResize = () => {
            if (ref.current) {
                const rect = ref.current.getBoundingClientRect();
                const parentRect = ref.current.parentElement?.getBoundingClientRect();

                if (parentRect) {
                    x = Math.min(x, parentRect.width - rect.width);
                    y = Math.min(y, parentRect.height - rect.height);
                }
            }
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <div
            ref={ref}
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
            }}
        >
            {children}
        </div>
    );
};

export default BouncingLogo;