import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Investment } from '@/lib/api';

interface PortfolioChartProps {
  investments: Investment[];
  totalPortfolioValue: number;
  totalInvested: number;
  totalProfitLoss: number;
}

export const PortfolioChart = ({ 
  investments, 
  totalPortfolioValue, 
  totalInvested, 
  totalProfitLoss 
}: PortfolioChartProps) => {
  const profitLossPercentage = totalInvested > 0 ? (totalProfitLoss / totalInvested) * 100 : 0;
  const isPositive = totalProfitLoss >= 0;

  // Group investments by asset type for pie chart
  const assetTypeData = investments.reduce((acc, investment) => {
    const type = investment.assetType;
    if (!acc[type]) {
      acc[type] = { value: 0, count: 0 };
    }
    acc[type].value += investment.currentValue;
    acc[type].count += 1;
    return acc;
  }, {} as Record<string, { value: number; count: number }>);

  const chartData = Object.entries(assetTypeData).map(([type, data]) => ({
    type,
    value: data.value,
    count: data.count,
    percentage: (data.value / totalPortfolioValue) * 100
  }));

  const getAssetTypeColor = (type: string) => {
    const colors = {
      stock: '#3B82F6',
      crypto: '#10B981',
      forex: '#F59E0B',
      commodity: '#EF4444',
      bond: '#8B5CF6'
    };
    return colors[type as keyof typeof colors] || '#6B7280';
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

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Portfolio Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Portfolio Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">
                  {formatCurrency(totalPortfolioValue)}
                </div>
                <div className="text-sm text-blue-600">Total Value</div>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">
                  {formatCurrency(totalInvested)}
                </div>
                <div className="text-sm text-green-600">Total Invested</div>
              </div>
            </div>
            
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className={`text-2xl font-bold ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                {formatCurrency(totalProfitLoss)}
              </div>
              <div className={`text-sm ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                {formatPercentage(profitLossPercentage)} Return
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Asset Allocation */}
      <Card>
        <CardHeader>
          <CardTitle>Asset Allocation</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {chartData.length > 0 ? (
              <>
                {/* Pie Chart Visualization */}
                <div className="relative w-32 h-32 mx-auto mb-4">
                  <svg className="w-full h-full" viewBox="0 0 100 100">
                    {chartData.map((asset, index) => {
                      const previousPercentage = chartData
                        .slice(0, index)
                        .reduce((sum, item) => sum + item.percentage, 0);
                      
                      const startAngle = (previousPercentage / 100) * 360;
                      const endAngle = ((previousPercentage + asset.percentage) / 100) * 360;
                      
                      const startRadians = (startAngle - 90) * (Math.PI / 180);
                      const endRadians = (endAngle - 90) * (Math.PI / 180);
                      
                      const x1 = 50 + 40 * Math.cos(startRadians);
                      const y1 = 50 + 40 * Math.sin(startRadians);
                      const x2 = 50 + 40 * Math.cos(endRadians);
                      const y2 = 50 + 40 * Math.sin(endRadians);
                      
                      const largeArcFlag = asset.percentage > 50 ? 1 : 0;
                      
                      return (
                        <path
                          key={asset.type}
                          d={`M 50 50 L ${x1} ${y1} A 40 40 0 ${largeArcFlag} 1 ${x2} ${y2} Z`}
                          fill={getAssetTypeColor(asset.type)}
                          stroke="white"
                          strokeWidth="2"
                        />
                      );
                    })}
                  </svg>
                </div>

                {/* Asset Type Breakdown */}
                <div className="space-y-2">
                  {chartData.map((asset) => (
                    <div key={asset.type} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div 
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: getAssetTypeColor(asset.type) }}
                        />
                        <span className="capitalize font-medium">{asset.type}</span>
                        <span className="text-sm text-muted-foreground">
                          ({asset.count} {asset.count === 1 ? 'asset' : 'assets'})
                        </span>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">{formatCurrency(asset.value)}</div>
                        <div className="text-sm text-muted-foreground">
                          {asset.percentage.toFixed(1)}%
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <div className="text-4xl mb-4">📊</div>
                <h3 className="text-lg font-semibold mb-2">No Investments Yet</h3>
                <p className="text-sm">Start investing to see your portfolio allocation here.</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}; 