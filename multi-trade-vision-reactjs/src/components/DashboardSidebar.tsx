import { NavLink } from "react-router-dom";
import { 
  Home, 
  TrendingUp, 
  Wallet, 
  FileText, 
  Users, 
  Settings,
  Shield,
  Activity
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

export const DashboardSidebar = () => {
  const { user } = useAuth();
  
  // Check if user is admin (you can add admin role to user data)
  const isAdmin = user?.email === "admin@multitradehub.com"; // Simple check for demo

  const navItems = [
    { to: "/dashboard", icon: Home, label: "Dashboard" },
    { to: "/dashboard/investments", icon: TrendingUp, label: "Investments" },
    { to: "/dashboard/wallet", icon: Wallet, label: "Wallet" },
    { to: "/dashboard/transactions", icon: FileText, label: "Transactions" },
    { to: "/dashboard/referrals", icon: Users, label: "Referrals" },
    { to: "/dashboard/settings", icon: Settings, label: "Settings" },
  ];

  const adminItems = [
    { to: "/admin", icon: Shield, label: "Admin Panel" },
    { to: "/admin/users", icon: Users, label: "User Management" },
    { to: "/admin/transactions", icon: Activity, label: "Transaction Review" },
  ];

  return (
    <aside className="w-64 bg-card border-r border-border min-h-screen">
      <div className="p-6">
        <h2 className="text-lg font-semibold mb-6">Navigation</h2>
        
        <nav className="space-y-2">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`
              }
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </NavLink>
          ))}
          
          {isAdmin && (
            <>
              <div className="border-t border-border my-4"></div>
              <div className="text-xs font-medium text-muted-foreground mb-2 px-3">
                ADMIN
              </div>
              {adminItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                      isActive
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted"
                    }`
                  }
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </NavLink>
              ))}
            </>
          )}
        </nav>
      </div>
    </aside>
  );
};