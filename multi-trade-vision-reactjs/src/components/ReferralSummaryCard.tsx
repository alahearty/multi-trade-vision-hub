import React from "react";
interface ReferralSummaryCardProps {
  totalReferrals: number;
  totalBonus: number;
}
const ReferralSummaryCard: React.FC<ReferralSummaryCardProps> = ({ totalReferrals, totalBonus }) => (
  <div className="bg-card p-6 rounded-lg shadow flex flex-col items-center justify-center">
    <div className="text-lg font-semibold mb-2">Total Referrals</div>
    <div className="text-3xl font-bold text-primary mb-4">{totalReferrals}</div>
    <div className="text-lg font-semibold mb-2">Total Bonus</div>
    <div className="text-2xl font-bold text-green-500">${totalBonus.toFixed(2)}</div>
  </div>
);
export default ReferralSummaryCard; 