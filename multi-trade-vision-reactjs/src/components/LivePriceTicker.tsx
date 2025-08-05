import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, Activity } from "lucide-react";

interface PriceData {
  symbol: string;
  price: number;
  change: number;
  changePercent: number;
  timestamp: string;
}

interface LivePriceTickerProps {
  symbols?: string[];
}

export const LivePriceTicker = ({ symbols = ["BTC", "ETH", "AAPL", "GOOGL", "TSLA", "MSFT"] }: LivePriceTickerProps) => {
  const [prices, setPrices] = useState<PriceData[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const [connectionError, setConnectionError] = useState<string | null>(null);
  const connectionRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    // Initialize with static prices
    const initialPrices: PriceData[] = symbols.map(symbol => ({
      symbol,
      price: getInitialPrice(symbol),
      change: 0,
      changePercent: 0,
      timestamp: new Date().toISOString()
    }));
    setPrices(initialPrices);

    // Connect to SignalR hub
    connectToPriceHub();

    return () => {
      if (connectionRef.current) {
        connectionRef.current.close();
      }
    };
  }, [symbols]);

  const getInitialPrice = (symbol: string): number => {
    const prices: Record<string, number> = {
      BTC: 45000,
      ETH: 3200,
      AAPL: 150,
      GOOGL: 2800,
      TSLA: 250,
      MSFT: 350
    };
    return prices[symbol] || 100;
  };

  const connectToPriceHub = () => {
    try {
      // For demo purposes, we'll simulate real-time updates
      // In production, you'd connect to the actual SignalR hub
      const ws = new WebSocket('ws://localhost:6001/priceHub');
      
      ws.onopen = () => {
        setIsConnected(true);
        setConnectionError(null);
        console.log('Connected to price hub');
      };

      ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          if (data.type === 'PriceUpdate') {
            setPrices(prevPrices => {
              const updatedPrices = [...prevPrices];
              data.prices.forEach((update: PriceData) => {
                const index = updatedPrices.findIndex(p => p.symbol === update.symbol);
                if (index !== -1) {
                  updatedPrices[index] = update;
                }
              });
              return updatedPrices;
            });
          }
        } catch (error) {
          console.error('Error parsing price update:', error);
        }
      };

      ws.onerror = (error) => {
        setConnectionError('Failed to connect to price feed');
        setIsConnected(false);
        console.error('WebSocket error:', error);
      };

      ws.onclose = () => {
        setIsConnected(false);
        console.log('Disconnected from price hub');
      };

      connectionRef.current = ws;
    } catch (error) {
      console.error('Error connecting to price hub:', error);
      setConnectionError('Failed to connect to price feed');
    }
  };

  // Simulate price updates for demo
  useEffect(() => {
    const interval = setInterval(() => {
      setPrices(prevPrices => 
        prevPrices.map(price => {
          const changePercent = (Math.random() - 0.5) * 0.02; // ±1% change
          const newPrice = price.price * (1 + changePercent);
          const change = newPrice - price.price;
          
          return {
            ...price,
            price: newPrice,
            change,
            changePercent: changePercent * 100,
            timestamp: new Date().toISOString()
          };
        })
      );
    }, 5000); // Update every 5 seconds

    return () => clearInterval(interval);
  }, []);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount);
  };

  const formatPercentage = (percentage: number) => {
    return `${percentage >= 0 ? '+' : ''}${percentage.toFixed(2)}%`;
  };

  const getChangeColor = (change: number) => {
    return change >= 0 ? 'text-green-600' : 'text-red-600';
  };

  const getChangeIcon = (change: number) => {
    return change >= 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Activity className={`h-4 w-4 ${isConnected ? 'text-green-500' : 'text-red-500'}`} />
          Live Market Prices
          <Badge variant={isConnected ? "default" : "secondary"} className="ml-auto">
            {isConnected ? "Live" : "Offline"}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {connectionError && (
          <div className="mb-4 p-2 bg-red-50 border border-red-200 rounded text-sm text-red-600">
            {connectionError}
          </div>
        )}
        
        <div className="space-y-3">
          {prices.map((price) => (
            <div key={price.symbol} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="font-semibold text-lg">{price.symbol}</div>
                <div className="text-sm text-muted-foreground">
                  {new Date(price.timestamp).toLocaleTimeString()}
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <div className="font-semibold text-lg">
                    {formatCurrency(price.price)}
                  </div>
                  <div className={`flex items-center gap-1 text-sm ${getChangeColor(price.change)}`}>
                    {getChangeIcon(price.change)}
                    {formatCurrency(Math.abs(price.change))}
                    <span>({formatPercentage(price.changePercent)})</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-4 text-xs text-muted-foreground text-center">
          Prices update every 5 seconds • Last updated: {new Date().toLocaleTimeString()}
        </div>
      </CardContent>
    </Card>
  );
}; 