import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Investments from "./pages/Investments";
import Wallet from "./pages/Wallet";
import Transactions from "./pages/Transactions";
import NotFound from "./pages/NotFound";
import Referrals from "./pages/Referrals";
import Settings from "./pages/Settings";
import Landing from './pages/Landing';
import Login from './pages/Login';
import SignUp from './pages/SignUp';

const queryClient = new QueryClient();
const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="min-h-screen flex flex-col">
          <div className="flex-1 flex flex-col">
            <Routes>
              <Route path="/" element={isAuthenticated ? <Index /> : <Landing />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/dashboard" element={<Index />} />
              <Route path="/dashboard/investments" element={<Investments />} />
              <Route path="/dashboard/wallet" element={<Wallet />} />
              <Route path="/dashboard/transactions" element={<Transactions />} />
              <Route path="/dashboard/referrals" element={<Referrals />} />
              <Route path="/dashboard/settings" element={<Settings />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
          <footer className="w-full bg-card border-t border-border py-3 text-center text-xs text-muted-foreground">
            © {new Date().getFullYear()} MultiTradeHub. All rights reserved.
          </footer>
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);
export default App;
