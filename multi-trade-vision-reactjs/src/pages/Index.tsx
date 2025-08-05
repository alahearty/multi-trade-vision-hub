import { useAuth } from "@/hooks/useAuth";
import { DashboardHeader } from "@/components/DashboardHeader";
import { DashboardSidebar } from "@/components/DashboardSidebar";
import { WalletBalance } from "@/components/WalletBalance";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TrendingUp, TrendingDown, DollarSign, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Index() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const quickActions = [
    {
      title: "Deposit Funds",
      description: "Add money to your wallet",
      icon: <DollarSign className="h-6 w-6" />,
      action: () => navigate('/dashboard/wallet'),
      color: "bg-green-500"
    },
    {
      title: "Invest Now",
      description: "Buy cryptocurrencies and stocks",
      icon: <TrendingUp className="h-6 w-6" />,
      action: () => navigate('/dashboard/investments'),
      color: "bg-blue-500"
    },
    {
      title: "View Transactions",
      description: "Check your transaction history",
      icon: <TrendingDown className="h-6 w-6" />,
      action: () => navigate('/dashboard/transactions'),
      color: "bg-purple-500"
    },
    {
      title: "Invite Friends",
      description: "Earn referral bonuses",
      icon: <Users className="h-6 w-6" />,
      action: () => navigate('/dashboard/referrals'),
      color: "bg-orange-500"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      
      <div className="flex">
        <DashboardSidebar />
        
        <main className="flex-1 p-6">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">
              Welcome back, {user?.firstName}!
            </h1>
            <p className="text-muted-foreground">
              Here's what's happening with your investments today.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {quickActions.map((action, index) => (
                  <Card 
                    key={index} 
                    className="cursor-pointer hover:shadow-lg transition-shadow"
                    onClick={action.action}
                  >
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">
                        {action.title}
                      </CardTitle>
                      <div className={`p-2 rounded-full ${action.color} text-white`}>
                        {action.icon}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-xs text-muted-foreground">
                        {action.description}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8 text-muted-foreground">
                    <div className="text-4xl mb-4">📊</div>
                    <h3 className="text-lg font-semibold mb-2">No Recent Activity</h3>
                    <p className="text-sm">Start trading to see your activity here.</p>
                    <Button 
                      className="mt-4" 
                      onClick={() => navigate('/dashboard/investments')}
                    >
                      Start Investing
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div>
              <WalletBalance />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
