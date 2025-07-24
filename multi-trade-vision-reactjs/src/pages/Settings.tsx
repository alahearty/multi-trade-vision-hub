import React from "react";
import ProfileSettingsForm from "../components/ProfileSettingsForm";
import SecuritySettings from "../components/SecuritySettings";
import NotificationSettings from "../components/NotificationSettings";
import AccountActions from "../components/AccountActions";
import { DashboardHeader } from "@/components/DashboardHeader";
import { DashboardSidebar } from "@/components/DashboardSidebar";

const Settings: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      <div className="flex">
        <DashboardSidebar />
        <main className="flex-1 p-6">
          <h1 className="text-3xl font-bold mb-2">Settings</h1>
          <p className="mb-6 text-muted-foreground">Manage your profile, security, and notification preferences.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-6">
              <ProfileSettingsForm />
              <SecuritySettings />
            </div>
            <div className="flex flex-col gap-6">
              <NotificationSettings />
              <AccountActions />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};
export default Settings; 