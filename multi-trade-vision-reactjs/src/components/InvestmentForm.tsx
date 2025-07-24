import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

interface InvestmentFormProps {
  selectedAsset: {
    symbol: string;
    name: string;
    price: string;
  };
  onSubmit: () => void;
}

export const InvestmentForm = ({ selectedAsset, onSubmit }: InvestmentFormProps) => {
  const [amount, setAmount] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!amount || parseFloat(amount) <= 0) {
      toast({
        title: "Invalid Amount",
        description: "Please enter a valid investment amount.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Investment Submitted",
        description: `Your investment of $${amount} in ${selectedAsset.symbol} has been submitted for processing.`,
      });
      setIsSubmitting(false);
      setAmount("");
      onSubmit();
    }, 1500);
  };

  const estimatedShares = amount ? (parseFloat(amount) / parseFloat(selectedAsset.price.replace('$', '').replace(',', ''))).toFixed(6) : '0';

  return (
    <Card className="border-primary">
      <CardHeader>
        <CardTitle className="text-lg">
          Invest in {selectedAsset.symbol} - {selectedAsset.name}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="amount">Investment Amount (USD)</Label>
            <Input
              id="amount"
              type="number"
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              step="0.01"
              min="0"
            />
          </div>
          
          <div className="bg-muted p-3 rounded-lg space-y-2">
            <div className="flex justify-between text-sm">
              <span>Current Price:</span>
              <span className="font-semibold">{selectedAsset.price}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Estimated Shares:</span>
              <span className="font-semibold">{estimatedShares}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Investment Amount:</span>
              <span className="font-semibold">${amount || '0.00'}</span>
            </div>
          </div>
          
          <div className="flex gap-2">
            <Button
              type="submit"
              disabled={isSubmitting || !amount}
              className="flex-1"
            >
              {isSubmitting ? "Submitting..." : "Submit Investment"}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={onSubmit}
            >
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};