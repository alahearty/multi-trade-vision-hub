import React from "react";
interface Referral {
  name: string;
  date: string;
  status: "completed" | "pending";
  bonus: number;
}
interface ReferralListProps {
  referrals: Referral[];
}
const ReferralList: React.FC<ReferralListProps> = ({ referrals }) => (
  <div className="bg-card p-4 rounded-lg mt-6">
    <h2 className="text-xl font-semibold mb-4">Referred Users</h2>
    <table className="w-full text-left">
      <thead>
        <tr className="border-b border-muted">
          <th className="py-2">Name</th>
          <th className="py-2">Date Joined</th>
          <th className="py-2">Status</th>
          <th className="py-2">Bonus</th>
        </tr>
      </thead>
      <tbody>
        {referrals.map((ref, idx) => (
          <tr key={idx} className="border-b border-muted last:border-0">
            <td className="py-2">{ref.name}</td>
            <td className="py-2">{ref.date}</td>
            <td className="py-2">
              <span className={
                ref.status === "completed"
                  ? "text-green-500 font-medium"
                  : "text-yellow-400 font-medium"
              }>
                {ref.status.charAt(0).toUpperCase() + ref.status.slice(1)}
              </span>
            </td>
            <td className="py-2 font-semibold text-green-500">{ref.bonus > 0 ? `$${ref.bonus.toFixed(2)}` : "-"}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);
export default ReferralList; 