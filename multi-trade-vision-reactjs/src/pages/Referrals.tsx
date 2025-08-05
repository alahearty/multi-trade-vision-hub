import React, { useState, useEffect } from "react";
import ReferralSummaryCard from "../components/ReferralSummaryCard";
import ReferralInviteForm from "../components/ReferralInviteForm";
import { ReferralList } from "../components/ReferralList";
import { DashboardHeader } from "@/components/DashboardHeader";
import { DashboardSidebar } from "@/components/DashboardSidebar";
import { apiClient } from "@/lib/api";

const Referrals: React.FC = () => {
  const [referralData, setReferralData] = useState({
    totalReferrals: 0,
    totalBonus: 0,
    referralCode: ""
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchReferralData();
  }, []);

  const fetchReferralData = async () => {
    try {
      setLoading(true);
      const response = await apiClient.getReferrals();
      
      if (response.error) {
        setError(response.error);
        return;
      }
      
      if (response.data) {
        setReferralData({
          totalReferrals: response.data.totalReferrals,
          totalBonus: response.data.totalBonus,
          referralCode: response.data.referralCode
        });
      }
    } catch (err) {
      setError('Failed to load referral data');
    } finally {
      setLoading(false);
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(referralData.referralCode);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <DashboardHeader />
        <div className="flex">
          <DashboardSidebar />
          <main className="flex-1 p-6">
            <div className="animate-pulse space-y-6">
              <div className="h-8 bg-gray-200 rounded w-1/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="h-32 bg-gray-200 rounded"></div>
                ))}
              </div>
            </div>
          </main>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background">
        <DashboardHeader />
        <div className="flex">
          <DashboardSidebar />
          <main className="flex-1 p-6">
            <div className="text-red-500 text-center py-8">{error}</div>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      <div className="flex">
        <DashboardSidebar />
        <main className="flex-1 p-6">
          <h1 className="text-3xl font-bold mb-2">Referrals</h1>
          <p className="mb-6 text-muted-foreground">Invite friends and earn bonuses for each successful referral.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <ReferralSummaryCard 
              totalReferrals={referralData.totalReferrals} 
              totalBonus={referralData.totalBonus} 
            />
            <div className="md:col-span-2 flex flex-col gap-4">
              <div className="bg-card p-4 rounded-lg flex items-center justify-between">
                <span className="font-mono text-sm">{referralData.referralCode}</span>
                <button 
                  className="ml-4 btn btn-primary" 
                  onClick={handleCopyLink}
                >
                  Copy Link
                </button>
              </div>
              <ReferralInviteForm />
            </div>
          </div>
          
          <ReferralList />
        </main>
      </div>
    </div>
  );
};

export default Referrals; 