import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { InvestmentForm } from "@/components/InvestmentForm";

const cryptoOptions = [
  { symbol: "BTC", name: "Bitcoin", price: "$43,250.00", change: "+2.5%" },
  { symbol: "ETH", name: "Ethereum", price: "$2,630.00", change: "+1.8%" },
  { symbol: "BNB", name: "Binance Coin", price: "$315.20", change: "+0.9%" },
  { symbol: "ADA", name: "Cardano", price: "$0.48", change: "+3.2%" },
  { symbol: "SOL", name: "Solana", price: "$98.50", change: "+4.1%" },
];

const stockOptions = [
  { symbol: "AAPL", name: "Apple Inc.", price: "$182.52", change: "+0.8%" },
  { symbol: "TSLA", name: "Tesla Inc.", price: "$248.50", change: "+2.1%" },
  { symbol: "GOOGL", name: "Alphabet Inc.", price: "$140.93", change: "+1.2%" },
  { symbol: "MSFT", name: "Microsoft Corp.", price: "$378.85", change: "+0.5%" },
  { symbol: "AMZN", name: "Amazon.com Inc.", price: "$153.40", change: "+1.7%" },
];

export const InvestmentTabs = () => {
  const [selectedAsset, setSelectedAsset] = useState<any>(null);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Investment Options</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="crypto">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="crypto">Cryptocurrency</TabsTrigger>
            <TabsTrigger value="stocks">Stocks</TabsTrigger>
          </TabsList>
          
          <TabsContent value="crypto" className="space-y-4">
            <div className="grid gap-3">
              {cryptoOptions.map((crypto) => (
                <div
                  key={crypto.symbol}
                  className={`p-4 rounded-lg border cursor-pointer transition-colors hover:bg-accent ${
                    selectedAsset?.symbol === crypto.symbol ? 'bg-accent border-primary' : ''
                  }`}
                  onClick={() => setSelectedAsset(crypto)}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="font-semibold">{crypto.symbol}</div>
                      <div className="text-sm text-muted-foreground">{crypto.name}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold">{crypto.price}</div>
                      <div className="text-sm text-green-400">{crypto.change}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="stocks" className="space-y-4">
            <div className="grid gap-3">
              {stockOptions.map((stock) => (
                <div
                  key={stock.symbol}
                  className={`p-4 rounded-lg border cursor-pointer transition-colors hover:bg-accent ${
                    selectedAsset?.symbol === stock.symbol ? 'bg-accent border-primary' : ''
                  }`}
                  onClick={() => setSelectedAsset(stock)}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="font-semibold">{stock.symbol}</div>
                      <div className="text-sm text-muted-foreground">{stock.name}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold">{stock.price}</div>
                      <div className="text-sm text-green-400">{stock.change}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
        
        {selectedAsset && (
          <div className="mt-6">
            <InvestmentForm selectedAsset={selectedAsset} onSubmit={() => setSelectedAsset(null)} />
          </div>
        )}
      </CardContent>
    </Card>
  );
};