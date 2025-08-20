# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

ZeroXBridge is a Next.js-based blockchain bridge application that facilitates cross-chain transfers between Ethereum and Starknet networks. The application uses TypeScript and Tailwind CSS for styling.

## Development Commands

- **Start development server**: `npm run dev` (uses Next.js with Turbopack)
- **Build for production**: `npm run build`
- **Start production server**: `npm start`
- **Lint code**: `npm run lint`

The project uses pnpm as the package manager (evidenced by pnpm-lock.yaml).

## Architecture Overview

### Multi-Chain Wallet Integration
The application supports dual blockchain connectivity:
- **Ethereum**: Via Wagmi with connectors for MetaMask, WalletConnect, and Safe
- **Starknet**: Via @starknet-react/core with Argent and Braavos wallet support

Wallet state is managed through a unified hook (`useWalletState`) that handles both chains simultaneously.

### Provider Hierarchy
The app uses a nested provider structure in `app/layout.tsx`:
```
WagmiProvider → QueryClientProvider → StarknetProvider → ThemeProvider → LayoutContent
```

### Theme System
- Uses a custom React Context (`ThemeContext.tsx`) for theme management
- Supports dark/light mode with localStorage persistence
- Tailwind configured with class-based dark mode
- Custom color variables and extensive responsive breakpoints

### Routing Structure
- **Landing pages**: Root (`/`) and about (`/about`)
- **Dashboard**: Main dashboard (`/dashboard`) with nested routes:
  - Analytics (`/dashboard/analytics`)
  - Swap (`/dashboard/swap`) 
  - Lock Liquidity (`/dashboard/lock-liquidity`)
  - Claim & Burn (`/dashboard/claim-burn`)
- **Governance**: Voting proposals (`/governance/voting-proposals`)

### Component Organization
- **UI Components**: Reusable components in `app/components/ui/`
- **Feature Components**: Domain-specific components for wallet connection, trading, analytics
- **Layout Components**: Sidebar, Navbar, mobile navigation

### Styling System
- Tailwind CSS with extensive custom configuration
- Custom breakpoints for various laptop sizes (MacBook, Windows laptops, 4K displays)
- Custom animations and color schemes
- CSS variables for theming

### Database Integration
- Uses Vercel Postgres (`@vercel/postgres`)
- Schema defined in `app/db/schema.sql`
- API routes in `app/api/`

## Key Technical Patterns

### Wallet Management
The `useWalletState` hook provides unified access to both Ethereum and Starknet wallet states, including connection status, addresses, and disconnect functionality.

### Conditional Layout Rendering
The sidebar and navigation are conditionally rendered based on the current route - they only appear on dashboard pages.

### TypeScript Configuration
- Uses path mapping with `@/*` for root-level imports
- Strict TypeScript configuration enabled
- Next.js plugin integration

## Development Notes

- The project uses Next.js 15+ with the App Router
- Turbopack is enabled for faster development builds
- ESLint configured with Next.js and TypeScript rules
- No additional testing framework is currently configured