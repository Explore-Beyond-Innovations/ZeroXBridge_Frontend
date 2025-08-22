"use client";

import { PieChartIcon } from "lucide-react";
import { ConnectWalletButton } from "../ui/ConnectWalletButton";
import { useTranslation } from "react-i18next";
import "../../../i18n-client"; // Initialize i18n on client side

export default function EmptyState() {
  const { t } = useTranslation();
  return (
    <div className="w-full max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="flex flex-col space-y-2 mb-8">
        <h1 className="text-2xl font-semibold text-primary-text">
          {t("navigation.analytics")}
        </h1>
        <p className="text-sm text-muted-foreground">
          {t("wallet.connect")} {t("common.amount")} {t("analytics.tvl")}{" "}
          {t("analytics.totalValueLocked")}
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
              {t("wallet.connect")}
            </h3>
            <p className="text-sm text-muted-foreground max-w-md">
              {t("analytics.tvl")} {t("analytics.totalValueLocked")}{" "}
              {t("analytics.lockedAssets")} {t("analytics.xzbBalance")}{" "}
              {t("analytics.change24h")}
            </p>
          </div>

          <ConnectWalletButton />
        </div>
      </div>
    </div>
  );
}
