import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  BarChart3, 
  Clock,
  Target,
  AlertTriangle,
  CheckCircle
} from "lucide-react";

interface TradingAsset {
  symbol: string;
  name: string;
  currentPrice: number;
  change24h: number;
  changePercent24h: number;
  volume24h: number;
  marketCap: number;
}

interface OrderForm {
  type: 'market' | 'limit' | 'stop' | 'stop-limit';
  side: 'buy' | 'sell';
  quantity: number;
  price?: number;
  stopPrice?: number;
  timeInForce: 'GTC' | 'IOC' | 'FOK';
}

interface OrderHistory {
  id: string;
  symbol: string;
  side: 'buy' | 'sell';
  type: string;
  quantity: number;
  price: number;
  status: 'pending' | 'filled' | 'cancelled' | 'rejected';
  timestamp: string;
}

export const AdvancedTradingInterface = () => {
  const [selectedAsset, setSelectedAsset] = useState<TradingAsset | null>(null);
  const [orderForm, setOrderForm] = useState<OrderForm>({
    type: 'market',
    side: 'buy',
    quantity: 0,
    timeInForce: 'GTC'
  });
  const [orderHistory, setOrderHistory] = useState<OrderHistory[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const tradingAssets: TradingAsset[] = [
    {
      symbol: 'BTC',
      name: 'Bitcoin',
      currentPrice: 45000,
      change24h: 1250,
      changePercent24h: 2.85,
      volume24h: 25000000000,
      marketCap: 850000000000
    },
    {
      symbol: 'ETH',
      name: 'Ethereum',
      currentPrice: 3200,
      change24h: -45,
      changePercent24h: -1.38,
      volume24h: 15000000000,
      marketCap: 380000000000
    },
    {
      symbol: 'AAPL',
      name: 'Apple Inc.',
      currentPrice: 150,
      change24h: 2.5,
      changePercent24h: 1.69,
      volume24h: 8000000000,
      marketCap: 2400000000000
    }
  ];

  useEffect(() => {
    // Load order history
    loadOrderHistory();
  }, []);

  const loadOrderHistory = () => {
    // Simulate order history
    const mockHistory: OrderHistory[] = [
      {
        id: '1',
        symbol: 'BTC',
        side: 'buy',
        type: 'market',
        quantity: 0.5,
        price: 44800,
        status: 'filled',
        timestamp: new Date(Date.now() - 3600000).toISOString()
      },
      {
        id: '2',
        symbol: 'ETH',
        side: 'sell',
        type: 'limit',
        quantity: 2.0,
        price: 3250,
        status: 'pending',
        timestamp: new Date(Date.now() - 7200000).toISOString()
      }
    ];
    setOrderHistory(mockHistory);
  };

  const handleAssetSelect = (symbol: string) => {
    const asset = tradingAssets.find(a => a.symbol === symbol);
    setSelectedAsset(asset || null);
  };

  const handleOrderSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedAsset) {
      toast({
        title: "Error",
        description: "Please select an asset to trade",
        variant: "destructive",
      });
      return;
    }

    if (orderForm.quantity <= 0) {
      toast({
        title: "Error",
        description: "Please enter a valid quantity",
        variant: "destructive",
      });
      return;
    }

    if (orderForm.type === 'limit' && !orderForm.price) {
      toast({
        title: "Error",
        description: "Please enter a limit price",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsSubmitting(true);
      
      // Simulate order submission
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newOrder: OrderHistory = {
        id: Date.now().toString(),
        symbol: selectedAsset.symbol,
        side: orderForm.side,
        type: orderForm.type,
        quantity: orderForm.quantity,
        price: orderForm.price || selectedAsset.currentPrice,
        status: 'pending',
        timestamp: new Date().toISOString()
      };

      setOrderHistory(prev => [newOrder, ...prev]);
      
      toast({
        title: "Order Submitted",
        description: `${orderForm.side.toUpperCase()} ${orderForm.quantity} ${selectedAsset.symbol} at ${orderForm.type} order`,
      });

      // Reset form
      setOrderForm({
        type: 'market',
        side: 'buy',
        quantity: 0,
        timeInForce: 'GTC'
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit order",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const formatPercentage = (percentage: number) => {
    return `${percentage >= 0 ? '+' : ''}${percentage.toFixed(2)}%`;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'filled':
        return 'bg-green-500/10 text-green-500 border-green-500/20';
      case 'pending':
        return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20';
      case 'cancelled':
        return 'bg-gray-500/10 text-gray-500 border-gray-500/20';
      case 'rejected':
        return 'bg-red-500/10 text-red-500 border-red-500/20';
      default:
        return 'bg-gray-500/10 text-gray-500 border-gray-500/20';
    }
  };

  const getChangeColor = (change: number) => {
    return change >= 0 ? 'text-green-600' : 'text-red-600';
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Asset Selection and Market Data */}
      <div className="lg:col-span-2 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Market Data
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {tradingAssets.map((asset) => (
                <div
                  key={asset.symbol}
                  className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                    selectedAsset?.symbol === asset.symbol 
                      ? 'border-primary bg-primary/5' 
                      : 'border-border hover:border-primary/50'
                  }`}
                  onClick={() => handleAssetSelect(asset.symbol)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="font-semibold text-lg">{asset.symbol}</div>
                    <div className="text-sm text-muted-foreground">{asset.name}</div>
                  </div>
                  
                  <div className="text-2xl font-bold mb-2">
                    {formatCurrency(asset.currentPrice)}
                  </div>
                  
                  <div className={`flex items-center gap-1 text-sm ${getChangeColor(asset.change24h)}`}>
                    {asset.change24h >= 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                    {formatCurrency(Math.abs(asset.change24h))}
                    <span>({formatPercentage(asset.changePercent24h)})</span>
                  </div>
                  
                  <div className="text-xs text-muted-foreground mt-2">
                    Vol: {formatCurrency(asset.volume24h)}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Order History */}
        <Card>
          <CardHeader>
            <CardTitle>Order History</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {orderHistory.map((order) => (
                <div key={order.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="font-medium">{order.symbol}</div>
                    <Badge variant={order.side === 'buy' ? 'default' : 'secondary'}>
                      {order.side.toUpperCase()}
                    </Badge>
                    <Badge className={getStatusColor(order.status)}>
                      {order.status}
                    </Badge>
                  </div>
                  
                  <div className="text-right">
                    <div className="font-medium">
                      {order.quantity} @ {formatCurrency(order.price)}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {new Date(order.timestamp).toLocaleString()}
                    </div>
                  </div>
                </div>
              ))}
              
              {orderHistory.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  <Clock className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <h3 className="text-lg font-semibold mb-2">No Orders Yet</h3>
                  <p className="text-sm">Your order history will appear here.</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Trading Form */}
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              Place Order
            </CardTitle>
          </CardHeader>
          <CardContent>
            {selectedAsset ? (
              <form onSubmit={handleOrderSubmit} className="space-y-4">
                <div className="p-3 bg-muted rounded-lg">
                  <div className="text-sm text-muted-foreground">Selected Asset</div>
                  <div className="font-semibold">{selectedAsset.symbol} - {selectedAsset.name}</div>
                  <div className="text-lg font-bold">{formatCurrency(selectedAsset.currentPrice)}</div>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="orderType">Order Type</Label>
                    <Select 
                      value={orderForm.type} 
                      onValueChange={(value: any) => setOrderForm({...orderForm, type: value})}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="market">Market</SelectItem>
                        <SelectItem value="limit">Limit</SelectItem>
                        <SelectItem value="stop">Stop</SelectItem>
                        <SelectItem value="stop-limit">Stop Limit</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="orderSide">Side</Label>
                    <div className="flex gap-2 mt-2">
                      <Button
                        type="button"
                        variant={orderForm.side === 'buy' ? 'default' : 'outline'}
                        onClick={() => setOrderForm({...orderForm, side: 'buy'})}
                        className="flex-1"
                      >
                        <TrendingUp className="h-4 w-4 mr-2" />
                        Buy
                      </Button>
                      <Button
                        type="button"
                        variant={orderForm.side === 'sell' ? 'default' : 'outline'}
                        onClick={() => setOrderForm({...orderForm, side: 'sell'})}
                        className="flex-1"
                      >
                        <TrendingDown className="h-4 w-4 mr-2" />
                        Sell
                      </Button>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="quantity">Quantity</Label>
                    <Input
                      id="quantity"
                      type="number"
                      step="0.0001"
                      min="0"
                      value={orderForm.quantity}
                      onChange={(e) => setOrderForm({...orderForm, quantity: parseFloat(e.target.value) || 0})}
                      placeholder="0.0000"
                    />
                  </div>

                  {(orderForm.type === 'limit' || orderForm.type === 'stop-limit') && (
                    <div>
                      <Label htmlFor="price">Price</Label>
                      <Input
                        id="price"
                        type="number"
                        step="0.01"
                        min="0"
                        value={orderForm.price || ''}
                        onChange={(e) => setOrderForm({...orderForm, price: parseFloat(e.target.value) || undefined})}
                        placeholder="0.00"
                      />
                    </div>
                  )}

                  {(orderForm.type === 'stop' || orderForm.type === 'stop-limit') && (
                    <div>
                      <Label htmlFor="stopPrice">Stop Price</Label>
                      <Input
                        id="stopPrice"
                        type="number"
                        step="0.01"
                        min="0"
                        value={orderForm.stopPrice || ''}
                        onChange={(e) => setOrderForm({...orderForm, stopPrice: parseFloat(e.target.value) || undefined})}
                        placeholder="0.00"
                      />
                    </div>
                  )}

                  <div>
                    <Label htmlFor="timeInForce">Time in Force</Label>
                    <Select 
                      value={orderForm.timeInForce} 
                      onValueChange={(value: any) => setOrderForm({...orderForm, timeInForce: value})}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="GTC">Good Till Cancelled</SelectItem>
                        <SelectItem value="IOC">Immediate or Cancel</SelectItem>
                        <SelectItem value="FOK">Fill or Kill</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Estimated Value:</span>
                      <span className="font-medium">
                        {formatCurrency(orderForm.quantity * (orderForm.price || selectedAsset.currentPrice))}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Fee:</span>
                      <span className="text-muted-foreground">$0.00</span>
                    </div>
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full" 
                    disabled={isSubmitting || orderForm.quantity <= 0}
                  >
                    {isSubmitting ? (
                      <>
                        <Clock className="h-4 w-4 mr-2 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        {orderForm.side === 'buy' ? <TrendingUp className="h-4 w-4 mr-2" /> : <TrendingDown className="h-4 w-4 mr-2" />}
                        {orderForm.side.toUpperCase()} {selectedAsset.symbol}
                      </>
                    )}
                  </Button>
                </div>
              </form>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <Target className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <h3 className="text-lg font-semibold mb-2">Select an Asset</h3>
                <p className="text-sm">Choose an asset from the market data to start trading.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}; 