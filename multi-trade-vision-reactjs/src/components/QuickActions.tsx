import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  ArrowUpCircle, 
  ArrowDownCircle, 
  TrendingUp, 
  Share2 
} from "lucide-react";
import { Link } from "react-router-dom";

export function QuickActions() {
  return (
    <Card className="bg-gradient-to-br from-card to-accent/20 shadow-[var(--shadow-card)]">
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-4">
        <Button className="h-16 flex flex-col gap-2 bg-gradient-to-r from-success to-success/80 hover:from-success/90 hover:to-success/70" asChild>
          <Link to="/wallet">
            <ArrowUpCircle className="w-5 h-5" />
            <span className="text-sm">Deposit</span>
          </Link>
        </Button>
        
        <Button variant="outline" className="h-16 flex flex-col gap-2" asChild>
          <Link to="/wallet">
            <ArrowDownCircle className="w-5 h-5" />
            <span className="text-sm">Withdraw</span>
          </Link>
        </Button>
        
        <Button variant="outline" className="h-16 flex flex-col gap-2" asChild>
          <Link to="/investments">
            <TrendingUp className="w-5 h-5" />
            <span className="text-sm">Invest</span>
          </Link>
        </Button>
        
        <Button variant="outline" className="h-16 flex flex-col gap-2">
          <Share2 className="w-5 h-5" />
          <span className="text-sm">Refer</span>
        </Button>
      </CardContent>
    </Card>
  );
}