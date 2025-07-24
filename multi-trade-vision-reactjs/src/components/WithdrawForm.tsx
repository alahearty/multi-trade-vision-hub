import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { ArrowDownLeft, AlertTriangle } from "lucide-react";

const withdrawalMethods = [
  { value: "bank", label: "Bank Transfer" },
  { value: "crypto", label: "Cryptocurrency Wallet" },
  { value: "paypal", label: "PayPal" }
];

export const WithdrawForm = () => {
  const [amount, setAmount] = useState("");
  const [method, setMethod] = useState("");
  const [walletAddress, setWalletAddress] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const availableBalance = 4900.39; // From wallet data
  const maxAmount = availableBalance;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!amount || !method) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    const withdrawAmount = parseFloat(amount);
    
    if (withdrawAmount <= 0) {
      toast({
        title: "Invalid Amount",
        description: "Please enter a valid withdrawal amount.",
        variant: "destructive",
      });
      return;
    }

    if (withdrawAmount > maxAmount) {
      toast({
        title: "Insufficient Funds",
        description: `Maximum withdrawal amount is $${maxAmount.toFixed(2)}`,
        variant: "destructive",
      });
      return;
    }

    if (method === "crypto" && !walletAddress) {
      toast({
        title: "Wallet Address Required",
        description: "Please provide your wallet address for crypto withdrawals.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Withdrawal Request Submitted",
        description: `Your withdrawal of $${amount} has been submitted for admin approval.`,
      });
      setIsSubmitting(false);
      setAmount("");
      setMethod("");
      setWalletAddress("");
    }, 2000);
  };

  const setMaxAmount = () => {
    setAmount(maxAmount.toString());
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ArrowDownLeft className="w-5 h-5" />
          Withdraw Funds
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4 p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg flex items-start gap-2">
          <AlertTriangle className="w-4 h-4 text-yellow-500 mt-0.5 flex-shrink-0" />
          <div className="text-sm text-yellow-600">
            <strong>Note:</strong> All withdrawal requests require manual admin approval for MVP. 
            Processing time: 1-3 business days.
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="withdrawal-method">Withdrawal Method</Label>
            <Select value={method} onValueChange={setMethod}>
              <SelectTrigger>
                <SelectValue placeholder="Select withdrawal method" />
              </SelectTrigger>
              <SelectContent>
                {withdrawalMethods.map((methodOption) => (
                  <SelectItem key={methodOption.value} value={methodOption.value}>
                    {methodOption.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label htmlFor="withdrawal-amount">Amount (USD)</Label>
              <Button
                type="button"
                variant="link"
                size="sm"
                onClick={setMaxAmount}
                className="text-xs p-0 h-auto"
              >
                Max: ${maxAmount.toFixed(2)}
              </Button>
            </div>
            <Input
              id="withdrawal-amount"
              type="number"
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              step="0.01"
              min="0"
              max={maxAmount}
            />
          </div>

          {method === "crypto" && (
            <div className="space-y-2">
              <Label htmlFor="wallet-address">Wallet Address</Label>
              <Input
                id="wallet-address"
                type="text"
                placeholder="Enter your wallet address"
                value={walletAddress}
                onChange={(e) => setWalletAddress(e.target.value)}
              />
            </div>
          )}

          {method && amount && (
            <div className="bg-muted p-4 rounded-lg space-y-2">
              <h4 className="font-semibold">Withdrawal Summary</h4>
              <div className="flex justify-between text-sm">
                <span>Method:</span>
                <span className="font-medium">
                  {withdrawalMethods.find(m => m.value === method)?.label}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Amount:</span>
                <span className="font-medium">${amount}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Processing Fee:</span>
                <span className="font-medium">$0.00</span>
              </div>
              <div className="border-t pt-2 flex justify-between text-sm font-semibold">
                <span>You will receive:</span>
                <span>${amount}</span>
              </div>
            </div>
          )}

          <Button
            type="submit"
            disabled={isSubmitting || !amount || !method || (method === "crypto" && !walletAddress)}
            className="w-full"
          >
            {isSubmitting ? "Submitting..." : "Submit Withdrawal Request"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};