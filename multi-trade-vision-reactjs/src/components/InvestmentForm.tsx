import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { TrendingUp, DollarSign } from "lucide-react";
import { apiClient } from "@/lib/api";

interface InvestmentFormProps {
  selectedAsset: {
    symbol: string;
    name: string;
    price: string;
    change: string;
  };
  onSubmit: () => void;
}

export const InvestmentForm = ({ selectedAsset, onSubmit }: InvestmentFormProps) => {
  const [quantity, setQuantity] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  // Parse price from string (remove $ and commas)
  const price = parseFloat(selectedAsset.price.replace(/[$,]/g, ""));
  const totalAmount = quantity ? parseFloat(quantity) * price : 0;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!quantity || parseFloat(quantity) <= 0) {
      toast({
        title: "Invalid Quantity",
        description: "Please enter a valid quantity to invest.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      const response = await apiClient.buyInvestment({
        assetType: selectedAsset.symbol.length <= 4 ? "stock" : "crypto",
        assetSymbol: selectedAsset.symbol,
        assetName: selectedAsset.name,
        quantity: parseFloat(quantity),
        price: price,
        totalAmount: totalAmount
      });

      if (response.error) {
        toast({
          title: "Investment Failed",
          description: response.error,
          variant: "destructive",
        });
        return;
      }

      if (response.data) {
        toast({
          title: "Investment Successful",
          description: response.data.message,
        });
        setQuantity("");
        onSubmit();
      }
    } catch (error) {
      toast({
        title: "Network Error",
        description: "Failed to process investment. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="w-5 h-5" />
          Buy {selectedAsset.symbol}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
              <div>
                <div className="font-semibold">{selectedAsset.symbol}</div>
                <div className="text-sm text-muted-foreground">{selectedAsset.name}</div>
              </div>
              <div className="text-right">
                <div className="font-semibold">{selectedAsset.price}</div>
                <div className="text-sm text-green-500">{selectedAsset.change}</div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="quantity">Quantity</Label>
              <Input
                id="quantity"
                type="number"
                placeholder="0.00"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                step="0.01"
                min="0"
              />
            </div>

            {quantity && (
              <div className="bg-muted p-4 rounded-lg space-y-2">
                <h4 className="font-semibold">Investment Summary</h4>
                <div className="flex justify-between text-sm">
                  <span>Asset:</span>
                  <span className="font-medium">{selectedAsset.symbol}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Price per unit:</span>
                  <span className="font-medium">{selectedAsset.price}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Quantity:</span>
                  <span className="font-medium">{quantity}</span>
                </div>
                <div className="border-t pt-2 flex justify-between text-sm font-semibold">
                  <span>Total Investment:</span>
                  <span className="text-primary">${totalAmount.toFixed(2)}</span>
                </div>
                <div className="text-xs text-muted-foreground mt-2">
                  * Transaction fee: $0.00 (Free for MVP)
                </div>
              </div>
            )}
          </div>

          <Button
            type="submit"
            disabled={isSubmitting || !quantity || parseFloat(quantity) <= 0}
            className="w-full"
          >
            {isSubmitting ? "Processing..." : `Buy ${selectedAsset.symbol}`}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};