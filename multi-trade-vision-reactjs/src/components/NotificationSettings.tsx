import React, { useState } from "react";
const NotificationSettings: React.FC = () => {
  const [email, setEmail] = useState(true);
  const [sms, setSms] = useState(false);
  const [push, setPush] = useState(true);
  const [success, setSuccess] = useState(false);
  const handleChange = () => {
    setSuccess(true);
    setTimeout(() => setSuccess(false), 1500);
  };
  return (
    <div className="bg-card p-4 rounded-lg flex flex-col gap-4">
      <h2 className="text-xl font-semibold mb-2">Notification Preferences</h2>
      <div className="flex items-center gap-2">
        <input id="notif-email" type="checkbox" checked={email} onChange={() => { setEmail(v => !v); handleChange(); }} className="toggle toggle-primary" />
        <label htmlFor="notif-email">Email Notifications</label>
      </div>
      <div className="flex items-center gap-2">
        <input id="notif-sms" type="checkbox" checked={sms} onChange={() => { setSms(v => !v); handleChange(); }} className="toggle toggle-primary" />
        <label htmlFor="notif-sms">SMS Notifications</label>
      </div>
      <div className="flex items-center gap-2">
        <input id="notif-push" type="checkbox" checked={push} onChange={() => { setPush(v => !v); handleChange(); }} className="toggle toggle-primary" />
        <label htmlFor="notif-push">Push Notifications</label>
      </div>
      {success && <span className="text-green-500">Preferences updated!</span>}
    </div>
  );
};
export default NotificationSettings; 