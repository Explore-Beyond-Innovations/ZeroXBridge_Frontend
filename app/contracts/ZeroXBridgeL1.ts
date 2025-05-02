import { ethers } from "ethers";

export const ZeroXBridgeL1ABI = [
  "function registerUser(bytes calldata signature, uint256 starknetPubKey) external",
  "function claim_tokens() external",
  "function deposit_asset(uint8 assetType, address tokenAddress, uint256 amount, address user) external payable returns (bytes32)",
  "function userRecord(address) external view returns (uint256)",
  "function claimableFunds(address) external view returns (uint256)",
  "event UserRegistered(address indexed user, uint256 starknetPubKey)",
  "event ClaimEvent(address indexed user, uint256 amount)",
  "event DepositEvent(address indexed token, uint8 assetType, uint256 amount, address indexed user, bytes32 commitmentHash)"
] as const;

export class ZeroXBridgeL1 extends ethers.Contract {
  private _signer: ethers.Signer | null = null;

  constructor(address: string, signerOrProvider: ethers.Signer | ethers.Provider) {
    super(address, ZeroXBridgeL1ABI, signerOrProvider);
    // Check if the signerOrProvider has a getAddress method (which indicates it's a signer)
    if (signerOrProvider && typeof (signerOrProvider as any).getAddress === 'function') {
      this._signer = signerOrProvider as ethers.Signer;
    }
  }

  async registerUser(signature: string, starknetPubKey: string): Promise<ethers.ContractTransactionResponse> {
    if (!this._signer) throw new Error("No signer available");
    return await this.getFunction("registerUser")(signature, starknetPubKey);
  }

  async claim_tokens(): Promise<ethers.ContractTransactionResponse> {
    if (!this._signer) throw new Error("No signer available");
    return await this.getFunction("claim_tokens")();
  }

  async deposit_asset(
    assetType: number,
    tokenAddress: string,
    amount: ethers.BigNumberish,
    options: { value?: ethers.BigNumberish } = {}
  ): Promise<ethers.ContractTransactionResponse> {
    if (!this._signer) throw new Error("No signer available");
    
    const address = await this._signer.getAddress();
    
    try {
      // Get the user's ETH balance first
      const balance = await this._signer.provider?.getBalance(address);
      if (!balance) throw new Error("Could not get user balance");

      // Convert amount to BigInt for consistent comparison
      const amountBigInt = ethers.getBigInt(amount);
      
      // For ETH deposits
      if (assetType === 0) {
        // Validate amount
        if (amountBigInt <= 0n) {
          throw new Error("Amount must be greater than 0");
        }

        // Check if user has enough ETH for the transfer
        if (balance < amountBigInt) {
          throw new Error(
            `Insufficient ETH balance. You have ${ethers.formatEther(balance)} ETH but trying to send ${ethers.formatEther(amountBigInt)} ETH`
          );
        }

        // Set value equal to amount for ETH transfers
        options.value = amountBigInt;
      }

      // Get current gas price first
      const feeData = await this._signer.provider?.getFeeData();
      if (!feeData || !feeData.gasPrice) {
        throw new Error("Could not get gas price");
      }

      // Estimate gas
      const gasEstimate = await this.getFunction("deposit_asset").estimateGas(
        assetType,
        tokenAddress,
        amount,
        address,
        options
      );

      // Add 20% buffer to gas estimate using bigint arithmetic
      const gasLimit = (gasEstimate * 120n) / 100n;

      // Calculate total cost (gas * gasPrice + value for ETH transfers)
      const gasCost = gasLimit * feeData.gasPrice;
      const totalCost = assetType === 0 ? gasCost + amountBigInt : gasCost;

      // Final balance check
      if (balance < totalCost) {
        const needed = ethers.formatEther(totalCost);
        const has = ethers.formatEther(balance);
        const gasEth = ethers.formatEther(gasCost);
        const transferEth = assetType === 0 ? ethers.formatEther(amountBigInt) : '0';
        
        throw new Error(
          `Insufficient funds for transaction. You need ${needed} ETH total (${gasEth} ETH for gas + ${transferEth} ETH for transfer) but have ${has} ETH`
        );
      }

      // Execute the transaction
      return await this.getFunction("deposit_asset")(
        assetType,
        tokenAddress,
        amount,
        address,
        { ...options, gasLimit }
      );
    } catch (error) {
      if (error instanceof Error) {
        // Preserve our custom error messages
        if (error.message.includes("Insufficient") || error.message.includes("Amount must be")) {
          throw error;
        }
        // Handle other errors
        if (error.message.includes("insufficient funds")) {
          throw new Error("Insufficient funds for transaction. Please ensure you have enough ETH to cover both the transfer amount and gas fees.");
        }
        throw new Error(`Failed to deposit asset: ${error.message}`);
      }
      throw error;
    }
  }

  async userRecord(address: string): Promise<ethers.BigNumber> {
    return await this.getFunction("userRecord")(address);
  }

  async claimableFunds(address: string): Promise<ethers.BigNumber> {
    return await this.getFunction("claimableFunds")(address);
  }
} 