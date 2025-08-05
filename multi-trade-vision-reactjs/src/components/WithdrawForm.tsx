import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Download, CreditCard } from "lucide-react";
import { apiClient } from "@/lib/api";

const currencies = [
  { value: "USD", label: "USD - US Dollar", symbol: "$" },
  { value: "BTC", label: "BTC - Bitcoin", symbol: "₿" },
  { value: "ETH", label: "ETH - Ethereum", symbol: "Ξ" }
];

export const WithdrawForm = () => {
  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState("");
  const [withdrawalMethod, setWithdrawalMethod] = useState("");
  const [accountDetails, setAccountDetails] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!amount || !currency || !withdrawalMethod || !accountDetails) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    const amountValue = parseFloat(amount);
    if (amountValue <= 0) {
      toast({
        title: "Invalid Amount",
        description: "Please enter a valid withdrawal amount.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      const response = await apiClient.withdraw({
        amount: amountValue,
        currency: currency,
        description: `Withdrawal via ${withdrawalMethod} to ${accountDetails}`
      });

      if (response.error) {
        toast({
          title: "Withdrawal Failed",
          description: response.error,
          variant: "destructive",
        });
        return;
      }

      if (response.data) {
        toast({
          title: "Withdrawal Successful",
          description: response.data.message,
        });
        setAmount("");
        setCurrency("");
        setWithdrawalMethod("");
        setAccountDetails("");
      }
    } catch (error) {
      toast({
        title: "Network Error",
        description: "Failed to submit withdrawal request. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const selectedCurrency = currencies.find(c => c.value === currency);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Download className="w-5 h-5" />
          Withdraw Funds
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="currency">Currency</Label>
              <Select value={currency} onValueChange={setCurrency}>
                <SelectTrigger>
                  <SelectValue placeholder="Select currency" />
                </SelectTrigger>
                <SelectContent>
                  {currencies.map((curr) => (
                    <SelectItem key={curr.value} value={curr.value}>
                      {curr.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="amount">Amount</Label>
              <div className="relative">
                <Input
                  id="amount"
                  type="number"
                  placeholder="0.00"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  step="0.01"
                  min="0"
                />
                {selectedCurrency && (
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                    {selectedCurrency.symbol}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="withdrawalMethod">Withdrawal Method</Label>
            <Select value={withdrawalMethod} onValueChange={setWithdrawalMethod}>
              <SelectTrigger>
                <SelectValue placeholder="Select withdrawal method" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="bank">Bank Transfer</SelectItem>
                <SelectItem value="paypal">PayPal</SelectItem>
                <SelectItem value="crypto">Cryptocurrency</SelectItem>
                <SelectItem value="wire">Wire Transfer</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="accountDetails">Account Details</Label>
            <Input
              id="accountDetails"
              placeholder="Enter account number, email, or wallet address"
              value={accountDetails}
              onChange={(e) => setAccountDetails(e.target.value)}
              required
            />
          </div>

          {currency && amount && withdrawalMethod && accountDetails && (
            <div className="bg-muted p-4 rounded-lg space-y-2">
              <h4 className="font-semibold">Withdrawal Summary</h4>
              <div className="flex justify-between text-sm">
                <span>Currency:</span>
                <span className="font-medium">{selectedCurrency?.label}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Amount:</span>
                <span className="font-medium">{selectedCurrency?.symbol}{amount}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Method:</span>
                <span className="font-medium capitalize">{withdrawalMethod}</span>
              </div>
              <div className="text-xs text-muted-foreground mt-2">
                * Processing time: 1-3 business days for bank transfers, instant for crypto
              </div>
            </div>
          )}

          <Button
            type="submit"
            disabled={isSubmitting || !amount || !currency || !withdrawalMethod || !accountDetails}
            className="w-full"
          >
            {isSubmitting ? "Processing..." : "Submit Withdrawal Request"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};