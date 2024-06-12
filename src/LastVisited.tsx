
import React, { useState, useEffect } from 'react';

interface LastVisitedProps {
    storagePrefix?: string;
    testOffset?: number;
}

const LastVisited: React.FC<LastVisitedProps> = ({ storagePrefix = "LastVisited-", testOffset = 0 }) => {
    const [lastVisited, setLastVisited] = useState<Date | null>(null);

    const getCurrentDate = () => {
        const now = new Date();
        now.setTime(now.getTime() + testOffset * 1000);
        return now;
    };

    useEffect(() => {
        const lastViewedTimeSetKey = `${storagePrefix}lastViewedTimeSet`;
        const currentlyVisitedKey = `${storagePrefix}currentlyVisited`;
        const lastVisitedKey = `${storagePrefix}lastVisited`;

        const lastViewedTimeSet = sessionStorage.getItem(lastViewedTimeSetKey);
        if (lastViewedTimeSet) {
            const now = getCurrentDate();
            localStorage.setItem(currentlyVisitedKey, now.toISOString());
        } else {
            const storedLastVisited = localStorage.getItem(currentlyVisitedKey);
            if (storedLastVisited) {
                localStorage.setItem(lastVisitedKey, storedLastVisited);
            }
            const now = getCurrentDate();
            localStorage.setItem(currentlyVisitedKey, now.toISOString());
            sessionStorage.setItem(lastViewedTimeSetKey, 'true');
        }

        const storedLastVisited = localStorage.getItem(lastVisitedKey);
        if (storedLastVisited) {
            setLastVisited(new Date(storedLastVisited));
        }
    }, [storagePrefix, testOffset]);

    const formatLastVisited = (date: Date) => {
        const now = getCurrentDate();
        const diff = now.getTime() - date.getTime();

        const seconds = Math.floor(diff / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);
        const months = Math.floor(days / 30);
        const years = Math.floor(months / 12);

        if (seconds < 60) {
            return `${seconds} seconds`;
        } else if (seconds < 120) {
            return `${minutes} minutes and ${seconds % 60} seconds`;
        } else if (minutes < 60) {
            return `${minutes} minutes`;
        } else if (minutes < 120) {
            return `${hours} hours and ${minutes % 60} minutes`;
        } else if (hours < 24) {
            return `${hours} hours`;
        } else if (hours < 48) {
            return `${days} days and ${hours % 24} hours`;
        } else if (days < 30) {
            return `${days} days`;
        } else if (days < 60) {
            return `${months} months and ${days % 30} days`;
        } else if (months < 12) {
            return `${months} months`;
        } else if (months < 24) {
            return `${years} years and ${months % 12} months`;
        } else {
            return `${years} years`;
        }
    };


    const getMessage = () => {
        if (!lastVisited) {
            return "Welcome aboard! This is your first time visiting us. We're excited to have you here!";
        }

        const now = getCurrentDate();
        const diff = now.getTime() - lastVisited.getTime();
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));

        if (days < 2) {
            return `Welcome back! We saw you here just ${formatLastVisited(lastVisited)} ago. That was fast!`;
        } else {
            return `Hey there! It's been a while since your last visit ${formatLastVisited(lastVisited)} ago. Welcome back!`;
        }
    };

    return (
        <div>
            {getMessage()}
        </div>
    );
};

export default LastVisited;