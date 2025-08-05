import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider, useAuth } from "@/hooks/useAuth";
import Index from "./pages/Index";
import Investments from "./pages/Investments";
import Wallet from "./pages/Wallet";
import Transactions from "./pages/Transactions";
import NotFound from "./pages/NotFound";
import Referrals from "./pages/Referrals";
import Settings from "./pages/Settings";
import Admin from "./pages/Admin";
import Landing from './pages/Landing';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import EmailVerification from './pages/EmailVerification';

const queryClient = new QueryClient();

const AppRoutes = () => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col">
        <div className="flex-1 flex flex-col">
          <Routes>
            <Route path="/" element={isAuthenticated ? <Index /> : <Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/verify-email" element={<EmailVerification />} />
            <Route path="/dashboard" element={isAuthenticated ? <Index /> : <Login />} />
            <Route path="/dashboard/investments" element={isAuthenticated ? <Investments /> : <Login />} />
            <Route path="/dashboard/wallet" element={isAuthenticated ? <Wallet /> : <Login />} />
            <Route path="/dashboard/transactions" element={isAuthenticated ? <Transactions /> : <Login />} />
            <Route path="/dashboard/referrals" element={isAuthenticated ? <Referrals /> : <Login />} />
            <Route path="/dashboard/settings" element={isAuthenticated ? <Settings /> : <Login />} />
            <Route path="/admin" element={isAuthenticated ? <Admin /> : <Login />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
        <footer className="w-full bg-card border-t border-border py-3 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} MultiTradeHub. All rights reserved.
        </footer>
      </div>
    </BrowserRouter>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <AppRoutes />
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
