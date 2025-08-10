'use client'
import { createContext, useContext, useState, ReactNode } from "react";
interface ConnectionContextType {
 isConnected: boolean;
 setIsConnected: (connected: boolean) => void;
 walletAddress: string | null;
 setWalletAddress: (address: string | null) => void;
}

const ConnectionContext = createContext<ConnectionContextType | undefined>(undefined)
interface ConnectionProviderProps {
  children: ReactNode;
}
 
export const ConnectionProvider = ({ children }: ConnectionProviderProps) => {
const [isConnected, setIsConnected] = useState(false);
 const [walletAddress, setWalletAddress] = useState<string | null>(null);

   return (
     <ConnectionContext.Provider value={{ isConnected, setIsConnected, walletAddress, setWalletAddress }}>
       {children}
     </ConnectionContext.Provider>
   );
 }

 export const useConnection = (): ConnectionContextType => {
  const context = useContext(ConnectionContext);
  if (!context) {
    throw new Error("useConnection must be used within a ConnectionProvider");
  }
  return context;
};