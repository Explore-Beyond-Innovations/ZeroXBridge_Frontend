'use client';

import { StarknetConfig, InjectedConnector } from '@starknet-react/core';
import { ReactNode } from 'react';

// Configuración de la red Starknet
const connectors = [
  new InjectedConnector({ options: { id: 'braavos' } }),
  new InjectedConnector({ options: { id: 'argentX' } }),
];

interface StarknetProviderProps {
  children: ReactNode;
}

export function StarknetProvider({ children }: StarknetProviderProps) {
  return (
    <StarknetConfig connectors={connectors}>
      {children}
    </StarknetConfig>
  );
} 