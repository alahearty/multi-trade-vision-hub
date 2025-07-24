import { useState } from "react";
import { DashboardHeader } from "@/components/DashboardHeader";
import { DashboardSidebar } from "@/components/DashboardSidebar";
import { InvestmentTabs } from "@/components/InvestmentTabs";
import { PendingInvestments } from "@/components/PendingInvestments";

const Investments = () => {
  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      
      <div className="flex">
        <DashboardSidebar />
        
        <main className="flex-1 p-6">
          <div className="mb-8">
            <h2 className="text-3xl font-bold mb-2">Investments</h2>
            <p className="text-muted-foreground">Invest in cryptocurrencies and stocks to grow your portfolio.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <InvestmentTabs />
            </div>
            
            <div>
              <PendingInvestments />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Investments;