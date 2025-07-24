import React, { useState } from "react";
import ReferralSummaryCard from "../components/ReferralSummaryCard";
import ReferralList from "../components/ReferralList";
import ReferralInviteForm from "../components/ReferralInviteForm";
import { DashboardHeader } from "@/components/DashboardHeader";
import { DashboardSidebar } from "@/components/DashboardSidebar";

const Referrals: React.FC = () => {
  // Mock data
  const referralLink = "https://multitradehub.com/ref/ABC123";
  const referrals = [
    { name: "John Doe", date: "2024-01-10", status: "completed", bonus: 25 },
    { name: "Jane Smith", date: "2024-01-12", status: "pending", bonus: 0 },
    { name: "Alex Lee", date: "2024-01-15", status: "completed", bonus: 25 },
  ];
  const totalReferrals = referrals.length;
  const totalBonus = referrals.reduce((sum, r) => sum + r.bonus, 0);
  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      <div className="flex">
        <DashboardSidebar />
        <main className="flex-1 p-6">
          <h1 className="text-3xl font-bold mb-2">Referrals</h1>
          <p className="mb-6 text-muted-foreground">Invite friends and earn bonuses for each successful referral.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <ReferralSummaryCard totalReferrals={totalReferrals} totalBonus={totalBonus} />
            <div className="md:col-span-2 flex flex-col gap-4">
              <div className="bg-card p-4 rounded-lg flex items-center justify-between">
                <span className="font-mono text-sm">{referralLink}</span>
                <button className="ml-4 btn btn-primary" onClick={() => navigator.clipboard.writeText(referralLink)}>Copy Link</button>
              </div>
              <ReferralInviteForm />
            </div>
          </div>
          <ReferralList referrals={referrals} />
        </main>
      </div>
    </div>
  );
};
export default Referrals; 