"use client";

import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { Lock } from "lucide-react";

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

      <div className="flex-1 flex flex-col gap-4 min-h-0">
        {/* First Row - Chart and Legend */}
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
            
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="w-14 h-14 bg-muted rounded-full flex items-center justify-center">
                <Lock className="w-8 h-8 text-muted-foreground" />
              </div>
            </div>
          </div>

          {/* Right Column - Legend */}
          <div className="space-y-2 pl-2 flex flex-col justify-center">
            {assetData.map((asset, index) => (
              <div key={index} className="flex items-center space-x-3">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: asset.color }}
                />
                <span className="text-sm font-medium text-primary-text">
                  {asset.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Second Row - Asset Details */}
        <div className="space-y-2 flex-shrink-0">
          {assetData.map((asset, index) => (
            <div key={index} className="flex items-center justify-between p-2 bg-muted/20 rounded-lg">
              <div className="flex items-center space-x-3">
                <span className="text-sm font-semibold text-primary-text min-w-[45px]">
                  {asset.name}
                </span>
              </div>
              <div className="flex items-center justify-end space-x-8">
                <div className="text-sm font-medium text-muted-foreground min-w-[80px] text-right">
                  ${asset.value.toLocaleString()}
                </div>
                <div className="text-sm font-bold text-primary-text min-w-[50px] text-right">
                  {asset.percentage}%
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}