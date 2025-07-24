import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, TrendingUp } from "lucide-react";

const pendingInvestments = [
  {
    id: 1,
    asset: "BTC",
    amount: "$1,500.00",
    shares: "0.034681",
    status: "pending",
    submittedAt: "2024-01-15 14:30",
  },
  {
    id: 2,
    asset: "AAPL",
    amount: "$500.00",
    shares: "2.738",
    status: "processing",
    submittedAt: "2024-01-15 10:15",
  },
  {
    id: 3,
    asset: "ETH",
    amount: "$800.00",
    shares: "0.304",
    status: "approved",
    submittedAt: "2024-01-14 16:45",
  },
];

export const PendingInvestments = () => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20";
      case "processing":
        return "bg-blue-500/10 text-blue-500 border-blue-500/20";
      case "approved":
        return "bg-green-500/10 text-green-500 border-green-500/20";
      default:
        return "bg-gray-500/10 text-gray-500 border-gray-500/20";
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="w-5 h-5" />
          Pending Investments
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {pendingInvestments.map((investment) => (
            <div
              key={investment.id}
              className="p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
            >
              <div className="flex justify-between items-start mb-2">
                <div>
                  <div className="font-semibold">{investment.asset}</div>
                  <div className="text-sm text-muted-foreground">
                    {investment.shares} shares
                  </div>
                </div>
                <Badge className={getStatusColor(investment.status)}>
                  {investment.status}
                </Badge>
              </div>
              
              <div className="text-lg font-semibold mb-2">
                {investment.amount}
              </div>
              
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Clock className="w-3 h-3" />
                {investment.submittedAt}
              </div>
            </div>
          ))}
          
          {pendingInvestments.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              <TrendingUp className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>No pending investments</p>
              <p className="text-sm">Start investing to see your requests here</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};