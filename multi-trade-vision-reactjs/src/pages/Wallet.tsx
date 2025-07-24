import { DashboardHeader } from "@/components/DashboardHeader";
import { DashboardSidebar } from "@/components/DashboardSidebar";
import { WalletBalance } from "@/components/WalletBalance";
import { DepositForm } from "@/components/DepositForm";
import { WithdrawForm } from "@/components/WithdrawForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Wallet = () => {
  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      
      <div className="flex">
        <DashboardSidebar />
        
        <main className="flex-1 p-6">
          <div className="mb-8">
            <h2 className="text-3xl font-bold mb-2">Wallet</h2>
            <p className="text-muted-foreground">Manage your deposits, withdrawals, and account balance.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Tabs defaultValue="deposit" className="space-y-6">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="deposit">Deposit Funds</TabsTrigger>
                  <TabsTrigger value="withdraw">Withdraw Funds</TabsTrigger>
                </TabsList>
                
                <TabsContent value="deposit">
                  <DepositForm />
                </TabsContent>
                
                <TabsContent value="withdraw">
                  <WithdrawForm />
                </TabsContent>
              </Tabs>
            </div>
            
            <div>
              <WalletBalance />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Wallet;