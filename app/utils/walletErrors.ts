export enum WalletErrorType {
  WALLET_NOT_INSTALLED = 'WALLET_NOT_INSTALLED',
  CONNECTION_REJECTED = 'CONNECTION_REJECTED',
  UNSUPPORTED_NETWORK = 'UNSUPPORTED_NETWORK',
  CONNECTION_FAILED = 'CONNECTION_FAILED',
  NETWORK_MISMATCH = 'NETWORK_MISMATCH',
  UNKNOWN_ERROR = 'UNKNOWN_ERROR'
}

export interface WalletError {
  type: WalletErrorType;
  message: string;
  suggestedAction?: string;
  retryable: boolean;
}

export const createWalletError = (type: WalletErrorType, originalError?: any): WalletError => {
  const errorMap: Record<WalletErrorType, Omit<WalletError, 'type'>> = {
    [WalletErrorType.WALLET_NOT_INSTALLED]: {
      message: "Wallet extension not detected",
      suggestedAction: "Please install the wallet extension and refresh the page",
      retryable: true
    },
    [WalletErrorType.CONNECTION_REJECTED]: {
      message: "Connection was cancelled",
      suggestedAction: "Please try connecting again and approve the connection",
      retryable: true
    },
    [WalletErrorType.UNSUPPORTED_NETWORK]: {
      message: "Unsupported network",
      suggestedAction: "Please switch to a supported network in your wallet",
      retryable: true
    },
    [WalletErrorType.CONNECTION_FAILED]: {
      message: "Failed to connect to wallet",
      suggestedAction: "Please check your wallet is unlocked and try again",
      retryable: true
    },
    [WalletErrorType.NETWORK_MISMATCH]: {
      message: "Network mismatch",
      suggestedAction: "Please switch to the correct network in your wallet",
      retryable: true
    },
    [WalletErrorType.UNKNOWN_ERROR]: {
      message: "An unexpected error occurred",
      suggestedAction: "Please refresh the page and try again",
      retryable: true
    }
  };

  return {
    type,
    ...errorMap[type]
  };
};

export const parseWalletError = (error: any): WalletError => {
  if (!error) {
    return createWalletError(WalletErrorType.UNKNOWN_ERROR);
  }

  const code = (error as any)?.code;
  const msg = (typeof error?.message === 'string' ? error.message : String(error || ''))
    .toLowerCase();

  // EIP-1193 / common codes
  if (code === 4001) { // user rejected
    return createWalletError(WalletErrorType.CONNECTION_REJECTED);
  }
  if (code === 4902) { // chain not added / unsupported
    return createWalletError(WalletErrorType.UNSUPPORTED_NETWORK);
  }
  if (code === -32002) { // request already pending
    return createWalletError(WalletErrorType.CONNECTION_FAILED);
  }

  // Connection rejected by user
  if (msg.includes('rejected') || msg.includes('denied') || msg.includes('canceled') || msg.includes('cancelled')) {
    return createWalletError(WalletErrorType.CONNECTION_REJECTED);
  }

  // Wallet not installed
  if (msg.includes('not installed') || msg.includes('provider not found') || msg.includes('no provider')) {
    return createWalletError(WalletErrorType.WALLET_NOT_INSTALLED);
  }

  // Network issues
  if (msg.includes('mismatch')) {
    return createWalletError(WalletErrorType.NETWORK_MISMATCH);
  }
  if (msg.includes('unsupported network') || msg.includes('unsupported chain') || msg.includes('wrong chain')) {
    return createWalletError(WalletErrorType.UNSUPPORTED_NETWORK);
  }

  // Generic connection failure
  if (msg.includes('connection') || msg.includes('connect')) {
    return createWalletError(WalletErrorType.CONNECTION_FAILED);
  }

  return createWalletError(WalletErrorType.UNKNOWN_ERROR);
};

export const getWalletInstallUrl = (walletName: string): string => {
  const installUrls: Record<string, string> = {
    'argentx': 'https://www.argent.xyz/download',
    'braavos': 'https://braavos.app/download',
    'metamask': 'https://metamask.io/download',
    'walletconnect': 'https://walletconnect.org'
  };

  return installUrls[walletName.toLowerCase()] || '#';
};