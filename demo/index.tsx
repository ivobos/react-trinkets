import React from 'react';
import { createRoot } from 'react-dom/client';
import { InspirationalQuote, KochSnowflake, LastVisited, LocalTimeTraveler, PixelArtGenerator, PrimeNumberCheck, SierpinskiTriangle, VirtualAquarium } from '../src/index';

const container = document.getElementById('app');
const root = createRoot(container!);
root.render(<div>
    <div style={{ border: 'solid 1px black' }}>
        <div>InspirationalQuote:</div>
        <InspirationalQuote />
    </div>
    <div style={{ border: 'solid 1px black' }}>
        <div>KochSnowflake:</div>
        <KochSnowflake />
    </div>
    <div style={{ border: 'solid 1px black' }}>
        <div>LastVisited:</div>
        <LastVisited />
    </div>
    <div style={{ border: 'solid 1px black' }}>
        <div>LocalTimeTraveler:</div>
        <LocalTimeTraveler />
    </div>
    <div style={{ border: 'solid 1px black' }}>
        <div>PixelArtGenerator:</div>
        <PixelArtGenerator size={10} pixelWidth={5} pixelHeight={5} />
    </div>
    <div style={{ border: 'solid 1px black' }}>
        <div>SierpinskiTriangle:</div>
        <SierpinskiTriangle width={200} height={200} depth={7} />
    </div>
    <div style={{ border: 'solid 1px black' }}>
        <div>VirtualAquarium:</div>
        <VirtualAquarium />
    </div>
    <div style={{ border: 'solid 1px black' }}>
        <div>PrimeNumberCheck:</div>
        <PrimeNumberCheck />
    </div>
</div >
);

