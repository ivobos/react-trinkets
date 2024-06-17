import React, { useEffect, useState } from "react";

interface Quote {
    content: string;
    author: string;
}

interface InspirationalQuoteProps {
    localStorageKey?: string;
}

const InspirationalQuote: React.FC<InspirationalQuoteProps> = ({ localStorageKey = 'InspirationalQuote' }) => {
    const [quote, setQuote] = useState<Quote | null>(null);

    useEffect(() => {
        try {
            const storedQuote = localStorage.getItem(localStorageKey);
            if (storedQuote) {
                const parsedQuote = JSON.parse(storedQuote);
                if (parsedQuote.content && parsedQuote.author) {
                    setQuote(parsedQuote);
                } else {
                    localStorage.removeItem(localStorageKey);
                }
            }
        } catch (error) {
            localStorage.removeItem(localStorageKey);
        }
        fetch('https://api.quotable.io/random')
            .then(response => response.json())
            .then(data => {
                const newQuote = { content: data.content, author: data.author };
                localStorage.setItem(localStorageKey, JSON.stringify(newQuote));
                if (!quote) {
                    setQuote(newQuote);
                }
            })
            .catch(error => console.error(error));
    }, [localStorageKey]);

    return (
        <div>
            {quote ? (
                <blockquote>
                    <p>{quote.content}</p>
                    <footer>{quote.author}</footer>
                </blockquote>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default InspirationalQuote;

