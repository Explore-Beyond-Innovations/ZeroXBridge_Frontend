import { InfoIcon } from "lucide-react"

interface WalletCardProps {
  isConnected: boolean
  balance: string
}

export default function WalletCard({ isConnected, balance }: WalletCardProps) {
  return (
    <div className="w-full h-full bg-gradient-to-b from-[#21192F] to-[#694F95] rounded-2xl border-none text-white backdrop-blur-sm p-6">
      <div className="flex flex-row items-start justify-between pb-4">
        <div className="space-y-4">
          <h2 className="text-lg font-medium">Wallet</h2>
          {isConnected ? (
            <button className="text-purple-300 hover:text-purple-200 transition-colors">+ Add Account</button>
          ) : (
            <div className="h-6" /> // Placeholder to maintain layout
          )}
        </div>
        <span className="text-2xl font-bold">${balance}</span>
      </div>
      <div className="flex items-center gap-2 text-sm text-white/60">
        <InfoIcon className="h-4 w-4" />
        <p>You can add another Address and also switch Addresses</p>
      </div>
    </div>
  )
}

