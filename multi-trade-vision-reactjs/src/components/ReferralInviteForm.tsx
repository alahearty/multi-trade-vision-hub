import React, { useState } from "react";
const ReferralInviteForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(false);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess(true);
    setEmail("");
    setTimeout(() => setSuccess(false), 2000);
  };
  return (
    <form onSubmit={handleSubmit} className="flex gap-2 items-center">
      <input
        type="email"
        placeholder="Enter email to invite"
        value={email}
        onChange={e => setEmail(e.target.value)}
        required
        className="input input-bordered px-3 py-2 rounded"
      />
      <button type="submit" className="btn btn-primary">Send Invite</button>
      {success && <span className="ml-2 text-green-500">Invite sent!</span>}
    </form>
  );
};
export default ReferralInviteForm; 