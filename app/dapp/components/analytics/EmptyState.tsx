"use client";

import { PieChartIcon } from "lucide-react";
import {ConnectWalletButton} from "../ui/ConnectWalletButton";

export default function EmptyState() {
  return (
    <div className="w-full max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="flex flex-col space-y-2 mb-8">
        <h1 className="text-2xl font-semibold text-primary-text">Analytics</h1>
        <p className="text-sm text-muted-foreground">
          Connect your wallet to view real-time statistics and market insights
        </p>
      </div>

      {/* Empty State */}
      <div className="flex flex-col items-center justify-center min-h-[400px] bg-card border border-card-border rounded-lg p-8">
        <div className="flex flex-col items-center space-y-6 text-center">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center">
            <PieChartIcon className="w-8 h-8 text-muted-foreground" />
          </div>
          
          <div className="space-y-2">
            <h3 className="text-xl font-semibold text-primary-text">
              Connect Your Wallet
            </h3>
            <p className="text-sm text-muted-foreground max-w-md">
              To view analytics, charts, and real-time statistics, please connect your wallet first.
            </p>
          </div>

          <ConnectWalletButton />
        </div>
      </div>
    </div>
  );
} 