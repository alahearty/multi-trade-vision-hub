import React, { useState } from "react";
import { Input } from '@/components/ui/input';
const ProfileSettingsForm: React.FC = () => {
  const [name, setName] = useState("Jane Doe");
  const [email, setEmail] = useState("jane@example.com");
  const [success, setSuccess] = useState(false);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess(true);
    setTimeout(() => setSuccess(false), 2000);
  };
  return (
    <form onSubmit={handleSubmit} className="bg-card p-4 rounded-lg flex flex-col gap-4">
      <h2 className="text-xl font-semibold mb-2">Profile Information</h2>
      <div>
        <label className="block mb-1">Name</label>
        <Input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          className="w-full"
          placeholder="Enter your name"
        />
      </div>
      <div>
        <label className="block mb-1">Email</label>
        <Input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="w-full"
          placeholder="Enter your email"
        />
      </div>
      <button type="submit" className="btn btn-primary w-fit">Save Changes</button>
      {success && <span className="text-green-500">Profile updated!</span>}
    </form>
  );
};
export default ProfileSettingsForm; 