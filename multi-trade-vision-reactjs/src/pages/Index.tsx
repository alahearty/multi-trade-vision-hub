import { DashboardHeader } from "@/components/DashboardHeader";
import { DashboardSidebar } from "@/components/DashboardSidebar";
import { StatsCard } from "@/components/StatsCard";
import { TradingChart } from "@/components/TradingChart";
import { QuickActions } from "@/components/QuickActions";
import { RecentActivity } from "@/components/RecentActivity";
import {
  Wallet,
  TrendingUp,
  Users,
  DollarSign,
  ArrowUpRight,
  ArrowDownRight
} from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      <div className="flex">
        <DashboardSidebar />
        <main className="flex-1 p-6">
          <div className="mb-8">
            <h2 className="text-3xl font-bold mb-2">Dashboard</h2>
            <p className="text-muted-foreground">Welcome back! Here's your portfolio overview.</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-6">
            <StatsCard
              title="Account Balance"
              value="$24,567.89"
              change="+12.5%"
              changeType="profit"
              icon={<Wallet className="w-8 h-8" />}
            />
            <StatsCard
              title="Total Investments"
              value="$18,420.00"
              change="+8.2%"
              changeType="profit"
              icon={<TrendingUp className="w-8 h-8" />}
            />
            <StatsCard
              title="Referral Earnings"
              value="$1,247.50"
              change="+15.3%"
              changeType="profit"
              icon={<Users className="w-8 h-8" />}
            />
            <StatsCard
              title="Available Balance"
              value="$4,900.39"
              change="-2.1%"
              changeType="loss"
              icon={<DollarSign className="w-8 h-8" />}
            />
          </div>

          {/* Mega Trading Chart Full Width */}
          <div className="mb-6">
            <TradingChart />
          </div>

          {/* Quick Actions and Recent Activity stacked below chart */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <QuickActions />
            <RecentActivity />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;
