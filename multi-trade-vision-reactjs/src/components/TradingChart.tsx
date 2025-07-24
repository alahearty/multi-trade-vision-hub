import { useState } from 'react';

const ASSETS = [
  { label: 'Bitcoin (BTCUSD)', value: 'BINANCE:BTCUSDT' },
  { label: 'Ethereum (ETHUSD)', value: 'BINANCE:ETHUSDT' },
  { label: 'Apple (AAPL)', value: 'NASDAQ:AAPL' },
  { label: 'Tesla (TSLA)', value: 'NASDAQ:TSLA' },
  { label: 'S&P 500 (SPX)', value: 'OANDA:SPX500USD' },
];

export function TradingChart() {
  const [symbol, setSymbol] = useState('BINANCE:BTCUSDT');

  return (
    <div className="bg-gradient-to-br from-card to-accent/20 shadow-[var(--shadow-card)] rounded-lg p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">Portfolio Performance</h2>
        <div className="flex items-center gap-2">
          <label htmlFor="asset-select" className="sr-only">Select Asset</label>
          <select
            id="asset-select"
            className="bg-[#181A20] text-[#E0E0E0] border border-input rounded px-3 py-2"
            value={symbol}
            onChange={e => setSymbol(e.target.value)}
          >
            {ASSETS.map(asset => (
              <option key={asset.value} value={asset.value}>{asset.label}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="w-full" style={{ minHeight: 420 }}>
        <div id="tradingview-widget-container">
          <iframe
            title="TradingView Chart"
            src={`https://s.tradingview.com/widgetembed/?frameElementId=tradingview-widget&symbol=${encodeURIComponent(symbol)}&interval=60&hidesidetoolbar=1&symboledit=1&saveimage=1&toolbarbg=rgba(23,27,38,1)&studies=[]&theme=dark&style=1&timezone=Etc/UTC&withdateranges=1&hidevolume=0&hidelegend=0&studies_overrides={}&overrides={}&enabled_features=[]&disabled_features=[]&locale=en`}
            style={{ width: '100%', height: 420, border: 0 }}
            allowFullScreen
          />
        </div>
      </div>
    </div>
  );
}