"use client";

import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { Lock } from "lucide-react";

// const assetData = [
//   { name: 'USDT', value: 3193.21, percentage: 55.4, color: '#2F80ED', price: 1.00 },
//   { name: 'ETH', value: 2931.49, percentage: 21.7, color: '#27AE60', price: 3245.67 },
//   { name: 'SOL', value: 938.84, percentage: 19.3, color: '#F2994A', price: 98.45 },
//   { name: 'STRK', value: 411.32, percentage: 14.1, color: '#EB5757', price: 1.23 },
//   { name: 'FTM', value: 221.32, percentage: 9.55, color: '#9B51E0', price: 0.45 }
// ];

const assetData = [
{ name: 'USDT', value: 3193.21, percentage: 45.4, color: '#2F80ED', price: 1.00 },
  { name: 'ETH', value: 2931.49, percentage: 21.7, color: '#27AE60', price: 3245.67 },
 { name: 'SOL', value: 938.84, percentage: 19.3, color: '#F2994A', price: 98.45 },
  { name: 'STRK', value: 411.32, percentage: 8.1, color: '#EB5757', price: 1.23 },
{ name: 'FTM', value: 221.32, percentage: 5.5, color: '#9B51E0', price: 0.45 }
];

export default function AssetPieChart() {
  return (
    <div className="bg-card border border-card-border rounded-xl p-4 h-full flex flex-col">
      <div className="mb-3 flex-shrink-0">
        <h3 className="text-lg font-semibold text-primary-text">
          Your Locked Assets
        </h3>
      </div>

      <div className="flex-1 flex flex-col gap-2 min-h-0">
        {/* First Row - Chart and Color/Token Representation */}
        <div className="grid grid-cols-2 gap-4 flex-1 min-h-0">
          {/* Left Column - Donut Chart with Lock Icon */}
          <div className="relative flex items-center justify-center min-h-0 h-40">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={assetData}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={70}
                  paddingAngle={2}
                  dataKey="percentage"
                >
                  {assetData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            
            {/* Lock Icon in Center */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="w-14 h-14 bg-muted rounded-full flex items-center justify-center">
                <Lock className="w-10 h-10 text-muted-foreground" />
              </div>
            </div>
          </div>

          {/* Right Column - Color and Token Representation */}
          <div className="space-y-0.5 pl-2">
            {assetData.map((asset, index) => (
              <div key={index} className="flex items-center space-x-2 p-1 bg-muted/20 rounded-md">
                <div
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: asset.color }}
                />
                <span className="text-xs font-medium text-primary-text">
                  {asset.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Second Row - Token, Price, and Percentage */}
        <div className="space-y-0.5 flex-shrink-0">
          {assetData.map((asset, index) => (
            <div key={index} className="flex items-center justify-between p-1 bg-muted/20 rounded-lg">
              <div className="flex items-center space-x-3">
                <span className="text-sm font-medium text-primary-text">
                  {asset.name}
                </span>
              </div>
              <div className="flex items-center space-x-6">
                <div className="text-right">
                  <div className="text-sm font-medium text-primary-text">
                    ${asset.price.toFixed(2)}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-primary-text">
                    {asset.percentage.toFixed(1)}%
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 