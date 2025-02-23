import React, { useState } from 'react';
import { ChevronDown, Info } from 'lucide-react';
import Image from 'next/image';

interface TokenData {
  available: number;
  balance: number;
  usdValue: number;
}

interface Asset {
  id: string;
  name: string;
  symbol: string;
  icon: string;
}

interface XZBInterfaceProps {
  tokenData: TokenData;
  onClaim: (asset: string) => void;
  onBurn: (amount: string, asset: string) => void;
  onConnect: () => void;
  isConnected: boolean;
}

const SAMPLE_ASSETS: Asset[] = [
  {
    id: '1',
    name: 'Ethereum',
    symbol: 'ETH',
    icon: '/token.svg'
  },
  {
    id: '2',
    name: 'USD Coin',
    symbol: 'USDC',
    icon: '/token.svg'
  },
  {
    id: '3',
    name: 'Tether',
    symbol: 'USDT',
    icon: '/token.svg'
  }
];

const XZBInterface: React.FC<XZBInterfaceProps> = ({
  tokenData,
  onClaim,
  onBurn,
  onConnect,
  isConnected
}) => {
  const [activeTab, setActiveTab] = useState<'claim' | 'burn'>('claim');
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);
  const [burnAmount, setBurnAmount] = useState<string>('');
  const [isAssetSelectorOpen, setIsAssetSelectorOpen] = useState(false);
  
  const calculateRedemptionAmount = (amount: string) => {
    const value = parseFloat(amount) || 0;
    return (value * 0.97).toFixed(2); // 3% fee
  };

  const handleAssetSelect = (asset: Asset) => {
    setSelectedAsset(asset);
    setIsAssetSelectorOpen(false);
  };

  return (
    <div className="w-[500px] rounded-3xl p-6 text-white">
      {/* Tab Buttons */}
      <div className="flex rounded-xl bg-[#21192F] p-1 mb-6">
        <button
          className={`flex-1 py-3 px-6 rounded-xl transition-all ${
            activeTab === 'claim' 
              ? 'bg-[#7D53C4] text-white' 
              : 'text-gray-400 hover:text-white'
          }`}
          onClick={() => setActiveTab('claim')}
        >
          Claim xZB
        </button>
        <button
          className={`flex-1 py-3 px-6 rounded-xl transition-all ${
            activeTab === 'burn' 
              ? 'bg-[#7D53C4] text-white' 
              : 'text-gray-400 hover:text-white'
          }`}
          onClick={() => setActiveTab('burn')}
        >
          Burn xZB
        </button>
      </div>

      <div className="space-y-6 bg-[#21192F] rounded-3xl p-6 w-full">
        {/* Title */}
        <h2 className="text-xl font-medium">
          {activeTab === 'claim' ? 'Claim Your xZB Tokens Now' : 'Burn Your xZB Tokens Now'}
        </h2>

        {/* Balance Display */}
        <div>
          <p className="text-gray-400 text-sm">
            {activeTab === 'claim' ? 'Available to claim' : 'xZB Balance'}
          </p>
          <div className="flex items-baseline gap-2">
            <p className="text-4xl font-medium">
              {activeTab === 'claim' 
                ? tokenData.available.toLocaleString() 
                : tokenData.balance.toLocaleString()
              } xZB
            </p>
          </div>
          <p className="text-gray-400 text-sm">
            ~${tokenData.usdValue.toLocaleString()}
          </p>
        </div>

        {activeTab === 'burn' && (
          <div className="space-y-4">
            {/* Amount Input */}
            <div>
              <p className="text-gray-400 text-sm mb-2">Enter amount to Burn</p>
              <div className="relative">
                <input
                  type="text"
                  value={burnAmount}
                  onChange={(e) => setBurnAmount(e.target.value)}
                  className="w-full bg-[#1F1333] border border-[#8B8B8B] rounded-xl p-4 pr-16 text-white"
                  placeholder="Enter Amount"
                />
                <button 
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#6c5dd3] text-sm"
                  onClick={() => setBurnAmount(tokenData.balance.toString())}
                >
                  MAX
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Asset Selector */}
        <div className="relative">
          <p className="text-gray-400 text-sm mb-2">
            {activeTab === 'burn' ? 'Receive Asset' : 'Select Asset'}
          </p>
          <button 
            className="w-full bg-[#1F1333] rounded-xl p-4 flex justify-between items-center border border-[#8B8B8B]"
            onClick={() => setIsAssetSelectorOpen(!isAssetSelectorOpen)}
          >
            {selectedAsset ? (
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full overflow-hidden relative bg-purple-500">
                  <Image
                    src={selectedAsset.icon}
                    alt={selectedAsset.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <span className="text-white">{selectedAsset.symbol}</span>
              </div>
            ) : (
              <span className="text-gray-400">Select Asset</span>
            )}
            <ChevronDown className={`text-gray-400 transition-transform ${isAssetSelectorOpen ? 'rotate-180' : ''}`} />
          </button>

          {/* Dropdown Menu */}
          {isAssetSelectorOpen && (
            <div className="absolute w-full mt-2 py-2 bg-[#1F1333] border border-[#8B8B8B] rounded-xl z-10 shadow-lg">
              {SAMPLE_ASSETS.map((asset) => (
                <button
                  key={asset.id}
                  className="w-full px-4 py-3 flex items-center gap-3 hover:bg-[#2A1C40] transition-colors"
                  onClick={() => handleAssetSelect(asset)}
                >
                  <div className="w-6 h-6 rounded-full overflow-hidden relative bg-purple-500">
                    <Image
                      src={asset.icon}
                      alt={asset.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex flex-col items-start">
                    <span className="text-white">{asset.symbol}</span>
                    <span className="text-gray-400 text-sm">{asset.name}</span>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Info Box */}
        <div className="rounded-xl space-y-2">
          {activeTab === 'claim' ? (
            <div className="flex items-center gap-2 bg-[#53436D] border border-dashed border-white rounded-xl py-4 px-3 text-[12px] w-full">
              <p className="text-gray-400 text-sm">
                You will receive xZB Tokens on Starknet after claiming
              </p>
            </div>
          ) : (
            <>
              <div className='bg-[#53436D] rounded-xl px-4 py-2 border border-dashed border-white text-[14px]'>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-400">Redemption Fee</span>
                  <span>3%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">You will receive</span>
                  <span>{calculateRedemptionAmount(burnAmount)} ETH</span>
                </div>
              </div>
              <div className="mt-4 bg-[#E25876] text-[#B9B9B9] rounded-xl py-4 px-3 text-[12px] border border-dashed border-white">
                Burning xZB is irreversible and subject to a 3% redemption fee
              </div>
            </>
          )}
        </div>

        {/* Action Button */}
        {isConnected ? (
          <button
            className="w-full bg-gradient-to-b from-[#A26DFF] to-[#09050E] hover:bg-[#5a4eb8] rounded-full p-4 font-medium transition-colors"
            onClick={() => activeTab === 'claim' 
              ? onClaim(selectedAsset?.id || '')
              : onBurn(burnAmount, selectedAsset?.id || '')
            }
          >
            {activeTab === 'claim' ? 'Claim xZB' : 'Burn xZB'}
          </button>
        ) : (
          <button
            className="w-full bg-gradient-to-b from-[#A26DFF] to-[#09050E] hover:bg-[#5a4eb8] rounded-full p-4 font-medium transition-colors"
            onClick={onConnect}
          >
            Connect Wallet
          </button>
        )}

        {/* Learn More */}
        <button className="flex items-center gap-1 text-gray-400 text-sm">
          <Info size={16} />
          Learn More
        </button>
      </div>
    </div>
  );
};

export default XZBInterface;