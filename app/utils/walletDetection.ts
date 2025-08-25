export interface WalletInfo {
  id: string;
  name: string;
  icon: string;
  downloadUrl: string;
  isInstalled: boolean;
  category: 'ethereum' | 'starknet';
  description: string;
}

// Check if wallet extensions are installed
export const checkWalletInstallation = () => {
  if (typeof window === 'undefined') {
    return {
      metamask: false,
      walletconnect: true, // WalletConnect doesn't require installation
      argentx: false,
      braavos: false
    };
  }

  return {
    metamask: !!(
      (window as any).ethereum?.isMetaMask ||
      (window as any).ethereum?.providers?.some((p: any) => p?.isMetaMask)
    ),
    walletconnect: true, // Always available
    argentx: !!(
      (window as any).starknet_argentX ||
      (window as any).starknet?.isArgentX ||
      (window as any).starknet?.providers?.some((p: any) => p?.isArgentX)
    ),
    braavos: !!(
      (window as any).starknet_braavos ||
      (window as any).starknet?.isBraavos ||
      (window as any).starknet?.providers?.some((p: any) => p?.isBraavos)
    )
  };
};

// Get wallet installation status with detailed info
export const getWalletInstallationDetails = (): WalletInfo[] => {
  const installation = checkWalletInstallation();

  return [
    {
      id: 'metamask',
      name: 'MetaMask',
      icon: '/icons/wallets/metamask.svg',
      downloadUrl: 'https://metamask.io/download/',
      isInstalled: installation.metamask,
      category: 'ethereum',
      description: 'The most popular Ethereum wallet'
    },
    {
      id: 'walletconnect',
      name: 'WalletConnect',
      icon: '/icons/wallets/walletconnect.svg',
      downloadUrl: 'https://walletconnect.com/',
      isInstalled: installation.walletconnect,
      category: 'ethereum',
      description: 'Connect with 300+ wallets'
    },
    {
      id: 'argentx',
      name: 'ArgentX',
      icon: '/wallet.svg', // Using default icon as per existing code
      downloadUrl: 'https://www.argent.xyz/download',
      isInstalled: installation.argentx,
      category: 'starknet',
      description: 'The smart wallet for Starknet'
    },
    {
      id: 'braavos',
      name: 'Braavos',
      icon: '/wallet.svg', // Using default icon as per existing code
      downloadUrl: 'https://braavos.app/download',
      isInstalled: installation.braavos,
      category: 'starknet',
      description: 'Smart wallet with advanced security'
    }
  ];
};

// Get available wallets for a specific category
export const getAvailableWallets = (category: 'ethereum' | 'starknet'): WalletInfo[] => {
  return getWalletInstallationDetails().filter(wallet => wallet.category === category);
};

// Get only installed wallets
export const getInstalledWallets = (category?: 'ethereum' | 'starknet'): WalletInfo[] => {
  const wallets = category 
    ? getAvailableWallets(category)
    : getWalletInstallationDetails();
  
  return wallets.filter(wallet => wallet.isInstalled);
};

// Get only missing wallets
export const getMissingWallets = (category?: 'ethereum' | 'starknet'): WalletInfo[] => {
  const wallets = category 
    ? getAvailableWallets(category)
    : getWalletInstallationDetails();
  
  return wallets.filter(wallet => !wallet.isInstalled);
};

// Check if any wallets are installed for a category
export const hasAnyWalletsInstalled = (category: 'ethereum' | 'starknet'): boolean => {
  return getInstalledWallets(category).length > 0;
};

// Get recommendation message based on installation status
export const getWalletRecommendation = (category: 'ethereum' | 'starknet'): string => {
  const installedCount = getInstalledWallets(category).length;
  const totalCount = getAvailableWallets(category).length;

  if (installedCount === 0) {
    return `No ${category} wallets detected. Install a wallet to get started.`;
  }

  if (installedCount === totalCount) {
    return `All ${category} wallets are installed and ready to use.`;
  }

  return `${installedCount} of ${totalCount} ${category} wallets installed.`;
};