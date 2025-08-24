'use client'

import { useEffect, useState } from 'react'
import { Menu, Info } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { TokenSelectDropdown } from '@/app/dapp/components/token-select-dropdown'
import { SuccessModal } from '@/app/dapp/components/success-modal'
import type { Token, LockTransaction } from '@/types/token'
import { ConnectWalletButton } from './ui/ConnectWalletButton'
import { useWallet } from '@/app/hooks'
import { useTranslation } from 'react-i18next'
import '../../i18n-client' // Initialize i18n on client side

// Mock token data
const mockTokens: Token[] = [
  {
    symbol: 'ETH',
    name: 'Ethereum',
    icon: '⟠',
    price: 3193.21,
    liquidity: 1391195483.0,
    xzbRate: 1.29,
    riskLevel: 'Low Risk',
    balance: 391.12,
  },
  {
    symbol: 'BTC',
    name: 'Bitcoin',
    icon: '₿',
    price: 45000.0,
    liquidity: 2500000000.0,
    xzbRate: 1.15,
    riskLevel: 'Low Risk',
    balance: 2.5,
  },
  {
    symbol: 'USDC',
    name: 'USD Coin',
    icon: '$',
    price: 1.0,
    liquidity: 500000000.0,
    xzbRate: 0.95,
    riskLevel: 'High Risk',
    balance: 10000.0,
  },
]

function SwapFromInputSkeleton() {
  return (
    <div
      className="bg-card border-[1.1px] border-card-border p-4 font-light rounded-[16px]"
      style={{
        boxShadow: '0px 0px 14px 0px #00000014',
      }}
    >
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-x-3">
          <div className="w-11 h-11 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse" />

          <div className="flex flex-col space-y-0.5">
            <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-8" />
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-12" />
          </div>
        </div>
        <div className="w-[35px] h-[35px] bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse" />
      </div>

      <div className="flex items-center mb-[14px] w-full space-x-2">
        <div className="h-[34px] bg-gray-200 dark:bg-gray-700 rounded animate-pulse flex-1" />
        <div className="h-[34px] w-[60px] bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse" />
      </div>

      <div className="flex items-center justify-between pt-[14.4px] border-t-[#F1F1F1] dark:border-t-[#232323] border-t-[1px] text-[13.3px]/[113%]">
        <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-24" />
        <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-16" />
      </div>
    </div>
  )
}

function SwapQuoteDetailsSkeleton() {
  return (
    <div className="flex flex-col space-y-2 mb-4 p-2">
      <div className="flex items-center justify-between text-sm/[113%]">
        <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-8" />
        <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-24" />
      </div>

      <div className="flex items-center justify-between text-sm/[113%]">
        <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-20" />
        <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-12" />
      </div>

      <div className="flex items-center justify-between text-sm/[113%]">
        <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-20" />
        <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-16" />
      </div>
    </div>
  )
}

const TokenLockInterface = () => {
  const [selectedToken, setSelectedToken] = useState<Token | null>(null)
  const [amount, setAmount] = useState('')
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false)
  const [lastTransaction, setLastTransaction] =
    useState<LockTransaction | null>(null)
  const [loadingToken, setLoadingToken] = useState(true)

  const { isConnected, openWalletModal } = useWallet()
  const { t } = useTranslation()

  const handleTokenSelect = (token: Token) => {
    setSelectedToken(token)
  }

  const handleMaxClick = () => {
    if (selectedToken) {
      setAmount(selectedToken.balance.toString())
    }
  }

  const handleLock = () => {
    if (selectedToken && amount) {
      const numAmount = Number.parseFloat(amount)
      const xzbReceived = numAmount * selectedToken.xzbRate

      const transaction: LockTransaction = {
        amount: numAmount,
        token: selectedToken,
        xzbReceived,
        timestamp: new Date().toLocaleString('en-US', {
          day: '2-digit',
          month: 'long',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true,
        }),
        txHash: '0x' + Math.random().toString(16).substr(2, 64),
      }

      setLastTransaction(transaction)
      setIsSuccessModalOpen(true)
      setAmount('')
    }
  }

  const calculateXzbReceived = () => {
    if (selectedToken && amount) {
      return (Number.parseFloat(amount) * selectedToken.xzbRate).toFixed(0)
    }
    return '0'
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoadingToken(false)
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div
      className={`w-full sm:max-w-[440px] border rounded-[17px]
         dark:bg-[#161616cc] dark:border-[#202020] bg-[#F7F7F7] border-[#EAEAEA]`}
    >
      <div className="flex justify-end pt-2 px-2 md:px-4 w-full max-w-full md:max-w-md">
        <Button
          variant="ghost"
          size="icon"
          className={`dark:text-[#FFF] text-[#878787]`}
        >
          <Menu className="h-8 w-8" />
        </Button>
      </div>

      <div className="sm:max-w-md mx-auto w-full">
        <Card
          className={`border-none shadow-none pt-2 bg-[#F7F7F7] dark:bg-[#161616cc]`}
        >
          <CardContent className="space-y-6 p-0">
            {loadingToken ? (
              <>
                <SwapFromInputSkeleton />
                <SwapQuoteDetailsSkeleton />
              </>
            ) : (
              <>
                <div
                  className={`py-4 px-2 rounded-[16px] border space-y-6 dark:shadow-none dark:bg-[#1D1D1D] shadow-[0_0_14px_0_rgba(0,0,0,0.08)] dark:border-[#202020] bg-[#FFF] border-[#EAEAEA]`}
                >
                  <TokenSelectDropdown
                    selectedToken={selectedToken}
                    onTokenSelect={handleTokenSelect}
                    tokens={mockTokens}
                    loadingToken={loadingToken}
                  />

                  <div className="space-y-4">
                    <div className="flex items-center justify-between gap-2 outline-none">
                      <Input
                        type="number"
                        inputMode="decimal"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder={t('deposit.enterAmount')}
                        className={`!text-4xl no-spinner font-light border-none !outline-none ring-0 
              focus:ring-0 focus:outline-none focus:shadow-none 
              p-0 h-12 !bg-transparent 
              dark:text-[#FFF] dark:placeholder-gray-500 
              placeholder-gray-400`}
                        disabled={!isConnected || !selectedToken}
                      />

                      <Button
                        variant="default"
                        size="sm"
                        onClick={handleMaxClick}
                        disabled={!isConnected || !selectedToken}
                        className={`dark:bg-[#232323] text-[14px] sm:text-[16px] border-[1.11px] border-[#EEEEEE] dark:border-none px-[13.3px] rounded-full text-[#737373] hover:bg-gray-50 bg-[#F4F4F4]`}
                      >
                        {t('common.max')}
                      </Button>
                    </div>
                    {isConnected && (
                      <>
                        <div
                          className={`w-full h-px dark:bg-[#232323] bg-[#F1F1F1]`}
                        />
                        <div
                          className={`flex justify-between text-sm dark:text-gray-400 text-[#737373]`}
                        >
                          <span className="text-[#737373]">
                            {t('deposit.balance')}:
                          </span>
                          <span className="text-[#1E1E1E] dark:text-[#CBCBCB]">
                            {selectedToken
                              ? `${selectedToken.balance} ${selectedToken.symbol}`
                              : '-- xZB'}
                          </span>
                        </div>
                      </>
                    )}
                  </div>
                </div>

                <div className="flex flex-col gap-1 sm:space-y-3 border-gray-200 dark:border-gray-700 px-5 sm:p-5">
                  <div className="flex justify-between text-sm">
                    <span className={`dark:text-[#737373] text-[#909090]`}>
                      Token Price:
                    </span>
                    <span
                      className={`font-medium dark:text-[#AFAFAF] text-[#909090]`}
                    >
                      {selectedToken
                        ? `$${selectedToken.price.toLocaleString()}`
                        : '$--'}
                    </span>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span className={`dark:text-[#737373] text-[#909090]`}>
                      Current Liquidity
                    </span>
                    <span
                      className={`font-medium dark:text-[#AFAFAF] text-[#909090]`}
                    >
                      {selectedToken
                        ? `$${selectedToken.liquidity.toLocaleString()}`
                        : '$--'}
                    </span>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span className={`dark:text-[#737373] text-[#909090]`}>
                      xZB Token Rate:
                    </span>
                    <span
                      className={`font-medium dark:text-[#AFAFAF] text-[#909090]`}
                    >
                      {selectedToken ? `$${selectedToken.xzbRate}` : '$--'}
                    </span>
                  </div>

                  {selectedToken && amount && (
                    <div className="flex justify-between text-sm">
                      <span className={`dark:text-[#737373] text-[#909090]`}>
                        {"You'll receive:"}
                      </span>
                      <span
                        className={`font-bold dark:text-[#FFF] text-[#1D1D1D]`}
                      >
                        {calculateXzbReceived()} xZB
                      </span>
                    </div>
                  )}
                </div>
              </>
            )}
            {isConnected && selectedToken && (
              <div
                className={`rounded-xl border mx-5 p-4 dark:bg-[#1D1D1D] dark:border-[#202020] bg-[#FFF] border-[#EAEAEA]`}
              >
                <div className="flex flex-col items-start gap-3">
                  <Info
                    className={`h-5 w-5 mt-0.5 flex-shrink-0 dark:text-[#B9B9B9] text-[#343434]`}
                  />
                  <p className={`text-sm dark:text-[#B9B9B9] text-[#343434]`}>
                    {t('lockSummary.title')} {selectedToken.symbol}{' '}
                    {t('common.amount')}, {t('claimBurn.availableToClaim')} xZB
                    {t('claimBurn.burnXZB')} {t('claimBurn.availableToClaim')}{' '}
                    {selectedToken.symbol}.
                  </p>
                </div>
              </div>
            )}

            {!loadingToken && (
              <div className="px-5">
                {isConnected ? (
                  <Button
                    className={`w-full py-3 h-10 font-bold rounded-full dark:bg-[#CDCDCD] dark:text-[#111111] dark:hover:bg-gray-600 bg-gray-800 text-[#FFF] hover:bg-gray-700`}
                    onClick={handleLock}
                    disabled={
                      !selectedToken ||
                      !amount ||
                      Number.parseFloat(amount) <= 0
                    }
                  >
                    {t('lockSummary.title')} {selectedToken?.symbol || 'Token'}
                  </Button>
                ) : (
                  <ConnectWalletButton
                    className="w-full rounded-[12px] font-light"
                    action={openWalletModal}
                  />
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <SuccessModal
        isOpen={isSuccessModalOpen}
        onClose={() => setIsSuccessModalOpen(false)}
        transaction={lastTransaction}
      />
    </div>
  )
}

export default TokenLockInterface
