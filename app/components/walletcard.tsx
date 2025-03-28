import { InfoIcon } from "lucide-react"

interface WalletCardProps {
  isConnected: boolean | undefined
  balance: string
  isDarkMode: boolean
}

export default function WalletCard({ isConnected, balance, isDarkMode }: WalletCardProps) {
  return (
    <div className={`w-full h-full ${isDarkMode ? 'bg-gradient-to-b from-[#21192F] to-[#694F95]' : 'bg-[#ECE1FF]'} rounded-2xl border-none text-white backdrop-blur-sm p-6`}>
      <div className="flex flex-row items-start justify-between pb-4">
        <div className="space-y-4">
          <h2 className={`text-lg font-medium ${isDarkMode ? 'text-white' : 'text-black'}`}>Wallet</h2>
          {isConnected ? (
            <button className={`${isDarkMode ? 'text-purple-300 hover:text-purple-200' : 'text-black hover:text-gray-600'} transition-colors`}>+ Add Account</button>
          ) : (
            <div className="h-6" /> // Placeholder to maintain layout
          )}
        </div>
        <span className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-black'}`}>${balance}</span>
      </div>
      <div className={`flex  items-center gap-2 text-sm  ${isDarkMode ? 'text-white/60' : 'text-black/60'}`}>
        <InfoIcon className="h-4 w-4" />
        <p>You can add another Address and also switch Addresses</p>
      </div>
    </div>
  )
}

