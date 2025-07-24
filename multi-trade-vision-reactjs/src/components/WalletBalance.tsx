import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Wallet, TrendingUp, TrendingDown, Clock } from "lucide-react";

const balanceData = {
  total: "$24,567.89",
  available: "$4,900.39",
  pending: "$2,150.00",
  invested: "$18,420.00"
};

const recentTransactions = [
  {
    id: 1,
    type: "deposit",
    amount: "$500.00",
    currency: "USD",
    status: "completed",
    date: "2024-01-15"
  },
  {
    id: 2,
    type: "withdrawal",
    amount: "$200.00",
    currency: "USD",
    status: "pending",
    date: "2024-01-14"
  },
  {
    id: 3,
    type: "investment",
    amount: "$1,000.00",
    currency: "BTC",
    status: "completed",
    date: "2024-01-13"
  }
];

export const WalletBalance = () => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-500/10 text-green-500 border-green-500/20";
      case "pending":
        return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20";
      case "failed":
        return "bg-red-500/10 text-red-500 border-red-500/20";
      default:
        return "bg-gray-500/10 text-gray-500 border-gray-500/20";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "deposit":
        return <TrendingUp className="w-4 h-4 text-green-500" />;
      case "withdrawal":
        return <TrendingDown className="w-4 h-4 text-red-500" />;
      case "investment":
        return <TrendingUp className="w-4 h-4 text-blue-500" />;
      default:
        return <Wallet className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wallet className="w-5 h-5" />
            Wallet Overview
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Total Balance</span>
              <span className="text-xl font-bold">{balanceData.total}</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Available</span>
              <span className="font-semibold text-green-500">{balanceData.available}</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Pending</span>
              <span className="font-semibold text-yellow-500">{balanceData.pending}</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Invested</span>
              <span className="font-semibold text-blue-500">{balanceData.invested}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="w-5 h-5" />
            Recent Activity
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentTransactions.map((transaction) => (
              <div
                key={transaction.id}
                className="flex items-center justify-between p-3 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  {getTypeIcon(transaction.type)}
                  <div>
                    <div className="font-medium capitalize">{transaction.type}</div>
                    <div className="text-sm text-muted-foreground">{transaction.date}</div>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="font-semibold">{transaction.amount}</div>
                  <Badge className={getStatusColor(transaction.status)}>
                    {transaction.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};