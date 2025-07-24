import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowUpCircle, 
  ArrowDownCircle, 
  TrendingUp, 
  Percent,
  Calendar,
  DollarSign
} from "lucide-react";

const allTransactions = [
  {
    id: "TXN001",
    type: "deposit",
    amount: "$500.00",
    currency: "USD",
    status: "completed",
    date: "2024-01-15 14:30:22",
    description: "Bank transfer deposit"
  },
  {
    id: "TXN002",
    type: "investment",
    amount: "$1,000.00",
    currency: "BTC",
    status: "completed",
    date: "2024-01-14 10:15:45",
    description: "Bitcoin investment purchase"
  },
  {
    id: "TXN003",
    type: "withdrawal",
    amount: "$200.00",
    currency: "USD",
    status: "pending",
    date: "2024-01-13 16:20:10",
    description: "Withdrawal to bank account"
  },
  {
    id: "TXN004",
    type: "interest",
    amount: "$45.67",
    currency: "USD",
    status: "completed",
    date: "2024-01-12 09:00:00",
    description: "Monthly interest payment"
  },
];

const depositTransactions = allTransactions.filter(t => t.type === "deposit");
const withdrawalTransactions = allTransactions.filter(t => t.type === "withdrawal");
const investmentTransactions = allTransactions.filter(t => t.type === "investment");
const interestTransactions = allTransactions.filter(t => t.type === "interest");

const TransactionTable = ({ transactions, title, icon }: { 
  transactions: typeof allTransactions, 
  title: string,
  icon: React.ReactNode 
}) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-500/10 text-green-500 border-green-500/20";
      case "pending":
        return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20";
      case "failed":
        return "bg-red-500/10 text-red-500 border-red-500/20";
      default:
        return "bg-gray-500/10 text-gray-500 border-gray-500/20";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "deposit":
        return <ArrowUpCircle className="w-4 h-4 text-green-500" />;
      case "withdrawal":
        return <ArrowDownCircle className="w-4 h-4 text-red-500" />;
      case "investment":
        return <TrendingUp className="w-4 h-4 text-blue-500" />;
      case "interest":
        return <Percent className="w-4 h-4 text-purple-500" />;
      default:
        return <DollarSign className="w-4 h-4" />;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {icon}
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {transactions.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <Calendar className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>No transactions found</p>
            <p className="text-sm">Your {title.toLowerCase()} will appear here</p>
          </div>
        ) : (
          <div className="space-y-3">
            {transactions.map((transaction) => (
              <div
                key={transaction.id}
                className="flex items-center justify-between p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  {getTypeIcon(transaction.type)}
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{transaction.id}</span>
                      <Badge className={getStatusColor(transaction.status)}>
                        {transaction.status}
                      </Badge>
                    </div>
                    <div className="text-sm text-muted-foreground mt-1">
                      {transaction.description}
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      {transaction.date}
                    </div>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="font-semibold text-lg">
                    {transaction.amount}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {transaction.currency}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export const TransactionLogs = () => {
  return (
    <Tabs defaultValue="all" className="space-y-6">
      <TabsList className="grid w-full grid-cols-5">
        <TabsTrigger value="all">All Transactions</TabsTrigger>
        <TabsTrigger value="deposits">Deposits</TabsTrigger>
        <TabsTrigger value="withdrawals">Withdrawals</TabsTrigger>
        <TabsTrigger value="investments">Investments</TabsTrigger>
        <TabsTrigger value="interest">Interest</TabsTrigger>
      </TabsList>
      
      <TabsContent value="all">
        <TransactionTable 
          transactions={allTransactions} 
          title="All Transactions"
          icon={<DollarSign className="w-5 h-5" />}
        />
      </TabsContent>
      
      <TabsContent value="deposits">
        <TransactionTable 
          transactions={depositTransactions} 
          title="Deposit History"
          icon={<ArrowUpCircle className="w-5 h-5" />}
        />
      </TabsContent>
      
      <TabsContent value="withdrawals">
        <TransactionTable 
          transactions={withdrawalTransactions} 
          title="Withdrawal History"
          icon={<ArrowDownCircle className="w-5 h-5" />}
        />
      </TabsContent>
      
      <TabsContent value="investments">
        <TransactionTable 
          transactions={investmentTransactions} 
          title="Investment History"
          icon={<TrendingUp className="w-5 h-5" />}
        />
      </TabsContent>
      
      <TabsContent value="interest">
        <TransactionTable 
          transactions={interestTransactions} 
          title="Interest History"
          icon={<Percent className="w-5 h-5" />}
        />
      </TabsContent>
    </Tabs>
  );
};