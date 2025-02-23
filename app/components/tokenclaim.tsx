"use client";
import { useRouter } from "next/navigation"; // Import Next.js router

interface TokenClaimProps {
  isConnected: boolean;
  onConnect: () => void;
}

export default function TokenClaim({ isConnected, onConnect }: TokenClaimProps) {
  const router = useRouter(); // Initialize the router

  const handleClick = () => {
    if (isConnected) {
      router.push("/dashboard"); //this routes to the get startedd page
    } else {
      onConnect(); // this connects the wallet
    }
  };

  return (
    <div className="w-full bg-[#21192F] h-full rounded-2xl text-white p-6 shadow-lg flex items-center">
      <div className="space-y-6">
        <h2 className="text-xl font-semibold">Claim/Burn XZB Tokens</h2>
        <button
          className="bg-black/25 text-white px-6 py-2 rounded-full hover:bg-black/40 transition-colors shadow-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          onClick={handleClick}
        >
          {isConnected ? "Get Started" : "Connect Wallet"}
        </button>
      </div>
    </div>
  );
}
