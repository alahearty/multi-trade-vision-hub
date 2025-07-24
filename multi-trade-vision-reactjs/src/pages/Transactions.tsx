import { DashboardHeader } from "@/components/DashboardHeader";
import { DashboardSidebar } from "@/components/DashboardSidebar";
import { TransactionLogs } from "@/components/TransactionLogs";

const Transactions = () => {
  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      
      <div className="flex">
        <DashboardSidebar />
        
        <main className="flex-1 p-6">
          <div className="mb-8">
            <h2 className="text-3xl font-bold mb-2">Transaction History</h2>
            <p className="text-muted-foreground">View all your transaction logs and activity history.</p>
          </div>

          <TransactionLogs />
        </main>
      </div>
    </div>
  );
};

export default Transactions;