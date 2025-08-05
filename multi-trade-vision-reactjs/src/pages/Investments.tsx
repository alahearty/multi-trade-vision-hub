import React, { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { DashboardHeader } from "@/components/DashboardHeader";
import { DashboardSidebar } from "@/components/DashboardSidebar";
import { InvestmentTabs } from "@/components/InvestmentTabs";
import { InvestmentForm } from "@/components/InvestmentForm";
import { PortfolioChart } from "@/components/PortfolioChart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TrendingUp, TrendingDown, DollarSign, Package } from "lucide-react";
import { apiClient, Investment } from "@/lib/api";

export default function Investments() {
  const { user } = useAuth();
  const [selectedAsset, setSelectedAsset] = useState<any>(null);
  const [portfolio, setPortfolio] = useState<{
    investments: Investment[];
    totalPortfolioValue: number;
    totalInvested: number;
    totalProfitLoss: number;
  }>({
    investments: [],
    totalPortfolioValue: 0,
    totalInvested: 0,
    totalProfitLoss: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPortfolio();
  }, []);

  const fetchPortfolio = async () => {
    try {
      setLoading(true);
      const response = await apiClient.getPortfolio();
      
      if (response.data) {
        setPortfolio(response.data);
      }
    } catch (error) {
      console.error('Failed to fetch portfolio:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInvestmentSubmit = () => {
    // Refresh portfolio data after new investment
    fetchPortfolio();
    setSelectedAsset(null);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const formatPercentage = (percentage: number) => {
    return `${percentage >= 0 ? '+' : ''}${percentage.toFixed(2)}%`;
  };

  const getProfitLossColor = (profitLoss: number) => {
    return profitLoss >= 0 ? 'text-green-600' : 'text-red-600';
  };

  const getProfitLossIcon = (profitLoss: number) => {
    return profitLoss >= 0 ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <DashboardHeader />
        <div className="flex">
          <DashboardSidebar />
          <main className="flex-1 p-6">
            <div className="animate-pulse space-y-6">
              <div className="h-8 bg-gray-200 rounded w-1/4"></div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {[...Array(2)].map((_, i) => (
                  <div key={i} className="h-64 bg-gray-200 rounded"></div>
                ))}
              </div>
            </div>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      <div className="flex">
        <DashboardSidebar />
        <main className="flex-1 p-6">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Investments</h1>
            <p className="text-muted-foreground">
              Manage your investment portfolio and discover new opportunities.
            </p>
          </div>

          <Tabs defaultValue="portfolio" className="space-y-6">
            <TabsList>
              <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
              <TabsTrigger value="discover">Discover</TabsTrigger>
            </TabsList>

            <TabsContent value="portfolio" className="space-y-6">
              {/* Portfolio Charts */}
              <PortfolioChart 
                investments={portfolio.investments}
                totalPortfolioValue={portfolio.totalPortfolioValue}
                totalInvested={portfolio.totalInvested}
                totalProfitLoss={portfolio.totalProfitLoss}
              />

              {/* Investment Holdings */}
              <Card>
                <CardHeader>
                  <CardTitle>Your Holdings</CardTitle>
                </CardHeader>
                <CardContent>
                  {portfolio.investments.length > 0 ? (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Asset</TableHead>
                          <TableHead>Type</TableHead>
                          <TableHead>Quantity</TableHead>
                          <TableHead>Avg Price</TableHead>
                          <TableHead>Current Value</TableHead>
                          <TableHead>Total Invested</TableHead>
                          <TableHead>Profit/Loss</TableHead>
                          <TableHead>Return %</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {portfolio.investments.map((investment) => {
                          const returnPercentage = investment.totalInvested > 0 
                            ? (investment.profitLoss / investment.totalInvested) * 100 
                            : 0;
                          
                          return (
                            <TableRow key={investment.id}>
                              <TableCell>
                                <div>
                                  <div className="font-medium">{investment.assetSymbol}</div>
                                  <div className="text-sm text-muted-foreground">{investment.assetName}</div>
                                </div>
                              </TableCell>
                              <TableCell>
                                <Badge variant="outline" className="capitalize">
                                  {investment.assetType}
                                </Badge>
                              </TableCell>
                              <TableCell>{investment.quantity.toFixed(4)}</TableCell>
                              <TableCell>{formatCurrency(investment.averagePrice)}</TableCell>
                              <TableCell className="font-medium">
                                {formatCurrency(investment.currentValue)}
                              </TableCell>
                              <TableCell>{formatCurrency(investment.totalInvested)}</TableCell>
                              <TableCell>
                                <div className={`flex items-center gap-1 ${getProfitLossColor(investment.profitLoss)}`}>
                                  {getProfitLossIcon(investment.profitLoss)}
                                  {formatCurrency(investment.profitLoss)}
                                </div>
                              </TableCell>
                              <TableCell className={getProfitLossColor(returnPercentage)}>
                                {formatPercentage(returnPercentage)}
                              </TableCell>
                            </TableRow>
                          );
                        })}
                      </TableBody>
                    </Table>
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">
                      <Package className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <h3 className="text-lg font-semibold mb-2">No Investments Yet</h3>
                      <p className="text-sm">Start investing to build your portfolio.</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="discover" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <InvestmentTabs onAssetSelect={setSelectedAsset} />
                </div>
                <div>
                  {selectedAsset && (
                    <InvestmentForm 
                      selectedAsset={selectedAsset} 
                      onSubmit={handleInvestmentSubmit}
                    />
                  )}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
}