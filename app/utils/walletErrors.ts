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

  const errorMessage = error.message?.toLowerCase() || error.toString().toLowerCase();

  // Connection rejected by user
  if (errorMessage.includes('rejected') || errorMessage.includes('denied') || errorMessage.includes('cancelled')) {
    return createWalletError(WalletErrorType.CONNECTION_REJECTED);
  }

  // Wallet not installed
  if (errorMessage.includes('not installed') || errorMessage.includes('not found') || errorMessage.includes('undefined')) {
    return createWalletError(WalletErrorType.WALLET_NOT_INSTALLED);
  }

  // Network issues
  if (errorMessage.includes('network') || errorMessage.includes('chain')) {
    return createWalletError(WalletErrorType.UNSUPPORTED_NETWORK);
  }

  // Generic connection failure
  if (errorMessage.includes('connection') || errorMessage.includes('connect')) {
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