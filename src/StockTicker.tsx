import React, { useEffect, useState } from 'react';

interface StockTickerProps {
    ticker: string;
    apiKey: string;
    displayValues?: ('ticker' | 'priceTraded' | 'changeDirection' | 'changeAmount' | 'volume' | 'changePercent')[];
}

const StockTicker: React.FC<StockTickerProps> = ({
    ticker,
    apiKey,
    displayValues = ['ticker', 'priceTraded', 'changeDirection']
}) => {
    const [stockData, setStockData] = useState<any>(null);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchStockData = async () => {
            try {
                const response = await fetch(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${ticker}&apikey=${apiKey}`);
                const data = await response.json();
                const globalQuote = data['Global Quote'];
                const priceTraded = parseFloat(globalQuote['05. price']);
                const previousClose = parseFloat(globalQuote['08. previous close']);
                const changeAmount = parseFloat(globalQuote['09. change']);
                const changeDirection = changeAmount > 0 ? 'up' : 'down';
                const volume = parseInt(globalQuote['06. volume']);
                const changePercent = parseFloat(globalQuote['10. change percent']);
                setStockData({
                    ticker,
                    priceTraded,
                    changeDirection,
                    changeAmount,
                    volume,
                    changePercent,
                });
            } catch (error: any) {
                setError(error);
            }
        };

        fetchStockData();
    }, [ticker, apiKey]);

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    if (!stockData) {
        return <div>Loading...</div>;
    }

    const priceColor = stockData.changeDirection === 'up' ? 'green' : 'red';

    return (
        <div style={{ display: 'flex', alignItems: 'center' }}>
            {displayValues.map((value) => {
                switch (value) {
                    case 'ticker':
                        return <span style={{ fontWeight: 'bold', marginRight: '10px' }} key={value}>{stockData.ticker}</span>;
                    case 'priceTraded':
                        return <span style={{ marginRight: '10px', color: priceColor }} key={value}>{stockData.priceTraded}</span>;
                    case 'changeDirection':
                        return <span style={{ marginRight: '10px', color: priceColor }} key={value}>{stockData.changeDirection === 'up' ? '▲' : '▼'} {stockData.changeAmount}</span>;
                    case 'changePercent':
                        return <span style={{ marginRight: '10px', color: priceColor }} key={value}>({stockData.changePercent}%)</span>;
                    case 'volume':
                        return <span style={{ marginLeft: 'auto', color: '#ccc' }} key={value}>VOL {stockData.volume.toLocaleString()}</span>;
                    default:
                        return null;
                }
            })}
        </div>
    );
};

export default StockTicker;