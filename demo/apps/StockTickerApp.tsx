import React, { useState } from "react";
import StockTicker from "../../src/StockTicker";

const StockTickerApp = () => {
    const [ticker, setTicker] = useState('IBM');
    const [apiKey, setApiKey] = useState('your_api_key_here');

    return (
        <div>
            <div>
                <span>Ticker:</span>
                <input type="text" value={ticker} onChange={(e) => setTicker(e.target.value)} />
            </div>
            <div>
                <span>API Key:</span>
                <input type="text" value={apiKey} onChange={(e) => setApiKey(e.target.value)} />
                <span>(www.alphavantage.co)</span>
            </div>
            <div>
                <StockTicker ticker={ticker} apiKey={apiKey} />
            </div>
        </div>
    );
}

export default StockTickerApp;