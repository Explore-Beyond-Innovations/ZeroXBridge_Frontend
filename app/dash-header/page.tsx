"use client"

import { useState } from "react"
import Analytictable from "../components/analyticgraph"
import WalletCard from "../components/walletcard"
import TokenClaim from "../components/tokenclaim"

export default function Dashboard() {
  const [isConnected, setIsConnected] = useState(false)
  const [balance, setBalance] = useState("---")

  const handleConnect = () => {
    setIsConnected(true)
    setBalance("1,234.56") //replace with actual balance fetching logic
  }

  return (
    <div className="min-h-screen bg-[#1C1B1F] p-6">
      <div className="max-w-[1400px] w-full mx-auto grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Left Panel: 40% width */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          <WalletCard isConnected={isConnected} balance={balance} />
          <TokenClaim isConnected={isConnected} onConnect={handleConnect} />
        </div>

        {/* Right Panel: 60% width */}
        <div className="lg:col-span-3 overflow-auto">
          <Analytictable />
        </div>
      </div>
    </div>
  )
}

