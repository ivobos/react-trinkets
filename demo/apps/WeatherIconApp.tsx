import React, { useState } from "react";
import { WeatherIcon } from "../../src";



const WeatherIconApp = () => {
    const [location, setLocation] = useState('');
    const [apiKey, setApiKey] = useState('your_api_key_here');

    return (
        <div>
            <div>
                <span>Location:</span>
                <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} />
            </div>
            <div>
                <span>API Key:</span>
                <input type="text" value={apiKey} onChange={(e) => setApiKey(e.target.value)} />
                <span>(openweathermap.org)</span>
            </div>
            <div>
                <WeatherIcon location={location} apiKey={apiKey} />
            </div>
        </div>
    );
}

export default WeatherIconApp;