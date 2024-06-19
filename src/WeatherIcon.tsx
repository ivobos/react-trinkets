import React, { useEffect, useState } from 'react';

interface Props {
    location?: string;
    apiKey: string;
}

const WeatherIcon: React.FC<Props> = ({ location, apiKey }) => {
    const [weatherData, setWeatherData] = useState<any>(null);
    const [error, setError] = useState<string>('');

    useEffect(() => {
        const getLocation = async () => {
            if (location) {
                return location;
            }

            try {
                const response = await fetch('https://ipapi.co/json/');
                const data = await response.json();
                return `${data.city}, ${data.country}`;
            } catch (error) {
                setError('Failed to get location');
                return null
            }
        };

        const getWeatherData = async () => {
            setError('');
            const currentLocation = await getLocation();
            if (!currentLocation) {
                return;
            }
            try {
                const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${currentLocation}&appid=${apiKey}`);
                if (response.ok) {
                    const data = await response.json();
                    setWeatherData(data);
                } else {
                    setError('Failed to get weather data:' + response.statusText);
                }
            } catch (error) {
                setError('Failed to get weather data:' + error);
            }
        };

        getWeatherData();
    }, [location, apiKey]);

    if (error) {
        return <div>{error}</div>;
    }

    if (!weatherData) {
        return <div>Loading...</div>;
    }

    const w = weatherData.weather[0];
    const icon = w.icon;
    const iconUrl = `http://openweathermap.org/img/wn/${icon}@2x.png`;
    const main = weatherData.main;

    // Convert temperature from Kelvin to Celsius
    const temp = Math.round(main.temp - 273.15);
    const tempMin = Math.round(main.temp_min - 273.15);
    const tempMax = Math.round(main.temp_max - 273.15);

    return (
        <div style={{ display: 'flex', alignItems: 'center' }}>
            <img src={iconUrl} alt="Weather Icon" />
            <div style={{ marginLeft: '10px' }}>
                <div style={{ fontWeight: 'bold' }}>
                    {weatherData.name}, {weatherData.sys.country}
                </div>
                <div style={{ fontSize: '14px', color: '#666' }}>
                    {w.description}
                </div>
                <div style={{ fontSize: '14px', color: '#666' }}>
                    Current: {temp}°C
                    <br />
                    Min: {tempMin}°C
                    <br />
                    Max: {tempMax}°C
                </div>
            </div>
        </div>
    );
};

export default WeatherIcon;
