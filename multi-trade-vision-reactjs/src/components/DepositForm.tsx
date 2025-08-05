import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Upload, CreditCard } from "lucide-react";
import { apiClient } from "@/lib/api";

const currencies = [
  { value: "USD", label: "USD - US Dollar", symbol: "$" },
  { value: "BTC", label: "BTC - Bitcoin", symbol: "₿" },
  { value: "ETH", label: "ETH - Ethereum", symbol: "Ξ" }
];

export const DepositForm = () => {
  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState("");
  const [paymentProof, setPaymentProof] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPaymentProof(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!amount || !currency) {
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
        description: "Please enter a valid deposit amount.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      const response = await apiClient.deposit({
        amount: amountValue,
        currency: currency,
        description: paymentProof ? `Deposit with proof: ${paymentProof.name}` : undefined
      });

      if (response.error) {
        toast({
          title: "Deposit Failed",
          description: response.error,
          variant: "destructive",
        });
        return;
      }

      if (response.data) {
        toast({
          title: "Deposit Successful",
          description: response.data.message,
        });
        setAmount("");
        setCurrency("");
        setPaymentProof(null);
      }
    } catch (error) {
      toast({
        title: "Network Error",
        description: "Failed to submit deposit request. Please try again.",
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
          <CreditCard className="w-5 h-5" />
          Deposit Funds
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
            <Label htmlFor="proof">Payment Proof (Optional)</Label>
            <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
              <input
                id="proof"
                type="file"
                accept="image/*,.pdf"
                onChange={handleFileChange}
                className="hidden"
              />
              <label
                htmlFor="proof"
                className="cursor-pointer flex flex-col items-center gap-2"
              >
                <Upload className="w-8 h-8 text-muted-foreground" />
                {paymentProof ? (
                  <div className="text-sm">
                    <span className="font-medium">{paymentProof.name}</span>
                    <br />
                    <span className="text-muted-foreground">Click to change</span>
                  </div>
                ) : (
                  <div className="text-sm text-muted-foreground">
                    Click to upload payment receipt or screenshot
                    <br />
                    (PNG, JPG, PDF)
                  </div>
                )}
              </label>
            </div>
          </div>

          {currency && amount && (
            <div className="bg-muted p-4 rounded-lg space-y-2">
              <h4 className="font-semibold">Deposit Summary</h4>
              <div className="flex justify-between text-sm">
                <span>Currency:</span>
                <span className="font-medium">{selectedCurrency?.label}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Amount:</span>
                <span className="font-medium">{selectedCurrency?.symbol}{amount}</span>
              </div>
              <div className="text-xs text-muted-foreground mt-2">
                * For MVP: This is a simulated deposit. Funds will be added to your test account.
              </div>
            </div>
          )}

          <Button
            type="submit"
            disabled={isSubmitting || !amount || !currency}
            className="w-full"
          >
            {isSubmitting ? "Processing..." : "Submit Deposit Request"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};