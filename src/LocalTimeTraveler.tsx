
import React, { useEffect, useState } from 'react';

interface Event {
    year: string;
    text: string;
}

interface HistoryResponse {
    date: string;
    data: {
        Events: Event[];
    };
}

interface LocalTimeTravelerProps {
    storageKey?: string;
}

const LocalTimeTraveler = ({ storageKey = 'local-time-traveler-history' }: LocalTimeTravelerProps) => {
    const [event, setEvent] = useState<Event | null>(null);
    const [error, setError] = useState<string>('');

    useEffect(() => {
        const fetchEvents = async () => {
            const storedHistory = localStorage.getItem(storageKey);
            const currentDate = new Date().toLocaleString('en-US', {
                month: 'long',
                day: 'numeric',
            });

            if (storedHistory) {
                const history: HistoryResponse = JSON.parse(storedHistory);
                if (history.date === currentDate) {
                    setEvent(history.data.Events[Math.floor(Math.random() * history.data.Events.length)]);
                    return;
                }
            }

            try {
                const response = await fetch(`https://history.muffinlabs.com/date`);
                const data = await response.json();
                const history: HistoryResponse = data;
                localStorage.setItem(storageKey, JSON.stringify(history));
                setEvent(history.data.Events[Math.floor(Math.random() * history.data.Events.length)]);
            } catch (error) {
                setError('Failed to fetch events');
            }
        };
        fetchEvents();
    }, [storageKey]);

    return (
        <>
            {event ? (
                <p>
                    On this day, {new Date().toLocaleString('en-US', { month: 'long', day: 'numeric' })}, in{' '}
                    <span>{event.year}</span>:
                    <br />
                    {event.text}
                </p>
            ) : (
                <p>{error}</p>
            )}
        </>
    );
};

export default LocalTimeTraveler;