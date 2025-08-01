"use client";
import { createContext, useContext, useState } from "react";

// Create context
const ConnectionContext = createContext();

// Create provider
export function ConnectionProvider({ children }) {
  const [isConnected, setIsConnected] = useState(false);

  return (
    <ConnectionContext.Provider value={{ isConnected, setIsConnected }}>
      {children}
    </ConnectionContext.Provider>
  );
}

// Custom hook to use the context
export function useConnection() {
  return useContext(ConnectionContext);
}
