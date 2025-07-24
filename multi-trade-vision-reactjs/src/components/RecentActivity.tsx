import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowUpCircle, ArrowDownCircle, TrendingUp } from "lucide-react";

interface Activity {
  id: string;
  type: "deposit" | "withdraw" | "investment";
  amount: string;
  asset: string;
  status: "completed" | "pending" | "failed";
  date: string;
}

const recentActivities: Activity[] = [
  {
    id: "1",
    type: "deposit",
    amount: "$1,250.00",
    asset: "USD",
    status: "completed",
    date: "2 hours ago"
  },
  {
    id: "2",
    type: "investment",
    amount: "$500.00",
    asset: "BTC",
    status: "pending",
    date: "4 hours ago"
  },
  {
    id: "3",
    type: "withdraw",
    amount: "$750.00",
    asset: "USD",
    status: "completed",
    date: "1 day ago"
  }
];

const getIcon = (type: Activity["type"]) => {
  switch (type) {
    case "deposit":
      return <ArrowUpCircle className="w-4 h-4 text-success" />;
    case "withdraw":
      return <ArrowDownCircle className="w-4 h-4 text-destructive" />;
    case "investment":
      return <TrendingUp className="w-4 h-4 text-primary" />;
  }
};

const getStatusColor = (status: Activity["status"]) => {
  switch (status) {
    case "completed":
      return "bg-success/20 text-success";
    case "pending":
      return "bg-warning/20 text-warning";
    case "failed":
      return "bg-destructive/20 text-destructive";
  }
};

export function RecentActivity() {
  return (
    <Card className="bg-gradient-to-br from-card to-accent/20 shadow-[var(--shadow-card)]">
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {recentActivities.map((activity) => (
          <div key={activity.id} className="flex items-center justify-between p-3 bg-background/50 rounded-lg">
            <div className="flex items-center space-x-3">
              {getIcon(activity.type)}
              <div>
                <p className="font-medium capitalize">{activity.type}</p>
                <p className="text-sm text-muted-foreground">{activity.asset}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-medium">{activity.amount}</p>
              <div className="flex items-center space-x-2">
                <Badge className={getStatusColor(activity.status)}>
                  {activity.status}
                </Badge>
                <span className="text-sm text-muted-foreground">{activity.date}</span>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}