export interface Token {
  symbol: string;
  name: string;
  icon: string;
  price: number;
  liquidity: number;
  xzbRate: number;
  riskLevel: "Low Risk" | "Medium Risk" | "High Risk";
  balance: number;
}

export interface LockTransaction {
  amount: number;
  token: Token;
  xzbReceived: number;
  timestamp: string;
  txHash: string;
}
