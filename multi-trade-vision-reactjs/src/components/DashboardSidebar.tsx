import { 
  LayoutDashboard, 
  TrendingUp, 
  Wallet, 
  Users, 
  FileText,
  Settings,
LogOut
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Link, useLocation } from "react-router-dom";

interface SidebarItem {
  icon: any;
  label: string;
  path: string;
}

const sidebarItems: SidebarItem[] = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" },
  { icon: TrendingUp, label: "Investments", path: "/dashboard/investments" },
  { icon: Wallet, label: "Wallet", path: "/dashboard/wallet" },
  { icon: Users, label: "Referrals", path: "/dashboard/referrals" },
  { icon: FileText, label: "Transactions", path: "/dashboard/transactions" },
  { icon: Settings, label: "Settings", path: "/dashboard/settings" },
];

export function DashboardSidebar() {
  const location = useLocation();
  
  return (
    <aside className="w-64 h-screen bg-card border-r border-border flex flex-col justify-between">
      <div className="flex-1 flex flex-col">
        <div className="p-6">
          <div className="text-sm text-muted-foreground mb-6">NAVIGATION</div>
          <nav className="space-y-2">
            {sidebarItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Button
                  key={item.label}
                  variant={isActive ? "default" : "ghost"}
                  className={cn(
                    "w-full justify-start",
                    isActive && "bg-primary text-primary-foreground"
                  )}
                  asChild
                >
                  <Link to={item.path}>
                    <item.icon className="w-4 h-4 mr-3" />
                    {item.label}
                  </Link>
                </Button>
              );
            })}
          </nav>
        </div>
      </div>
      <div className="p-6 flex flex-col gap-4">
        
        <Button variant="ghost" className="w-full justify-start text-destructive">
          <LogOut className="w-4 h-4 mr-3" />
          Logout
        </Button>
      </div>
    </aside>
  );
}