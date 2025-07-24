import React, { useState } from "react";
import { Input } from '@/components/ui/input';
const SecuritySettings: React.FC = () => {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [twoFA, setTwoFA] = useState(false);
  const [success, setSuccess] = useState("");
  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess("Password changed!");
    setPassword("");
    setTimeout(() => setSuccess(""), 2000);
  };
  const handle2FAToggle = () => {
    setTwoFA(v => !v);
    setSuccess(twoFA ? "2FA disabled" : "2FA enabled");
    setTimeout(() => setSuccess(""), 2000);
  };
  return (
    <div className="bg-card p-4 rounded-lg flex flex-col gap-4">
      <h2 className="text-xl font-semibold mb-2">Security Settings</h2>
      <form onSubmit={handlePasswordChange} className="flex gap-2 items-center">
        <Input
          type={showPassword ? "text" : "password"}
          placeholder="New password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="w-48"
        />
        <button type="button" className="btn btn-secondary" onClick={() => setShowPassword(v => !v)}>
          {showPassword ? "Hide" : "Show"}
        </button>
        <button type="submit" className="btn btn-primary">Change Password</button>
      </form>
      <div className="flex items-center gap-2">
        <label htmlFor="2fa-toggle" className="font-medium">Two-Factor Authentication</label>
        <input
          id="2fa-toggle"
          type="checkbox"
          checked={twoFA}
          onChange={handle2FAToggle}
          className="toggle toggle-primary"
        />
        <span>{twoFA ? "Enabled" : "Disabled"}</span>
      </div>
      {success && <span className="text-green-500">{success}</span>}
    </div>
  );
};
export default SecuritySettings; 