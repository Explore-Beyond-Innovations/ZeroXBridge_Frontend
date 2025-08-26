import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { ethers } from "ethers";
import { SiweMessage } from "siwe";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      id: "ethereum",
      name: "Ethereum",
      credentials: {
        address: { label: "Address", type: "text" },
        signature: { label: "Signature", type: "text" },
        message: { label: "Message (SIWE)", type: "text" },
        nonce: { label: "Nonce", type: "text" },
      },
      async authorize(credentials, req) {
        if (
          !credentials?.address ||
          !credentials?.signature ||
          !credentials?.message ||
          !credentials?.nonce
        ) {
          return null;
        }

        try {
          // Check if the address is an Ethereum address
          const isEthAddress =
            credentials.address.startsWith("0x") &&
            credentials.address.length === 42;

          // Check if the address is a Starknet address (starts with 0x and is 64 or 66 chars)
          const isStarknetAddress =
            credentials.address.startsWith("0x") &&
            (credentials.address.length === 66 ||
              credentials.address.length === 64);

          if (isEthAddress) {
            // Process Ethereum wallet authentication

            // Input validation guards
            // 1. Verify credentials.address is a valid EVM address
            if (!ethers.isAddress(credentials.address)) {
              console.error("Invalid EVM address format");
              return null;
            }

            // 2. Ensure credentials.signature is a 65-byte hex string (0x-prefixed, 132 characters)
            const signatureRegex = /^0x[a-fA-F0-9]{130}$/;
            if (!signatureRegex.test(credentials.signature)) {
              console.error(
                "Invalid signature format - must be 65-byte hex string"
              );
              return null;
            }

            // 3. Enforce sane credentials.message length limit (max 1024 chars)
            if (credentials.message.length > 1024) {
              console.error("Message too long - exceeds 1024 character limit");
              return null;
            }

            // Parse and verify SIWE message
            const siwe = new SiweMessage(credentials.message);
            const domain = new URL(
              process.env.NEXTAUTH_URL ?? req.headers?.origin ?? ""
            ).host;

            // Check message timing to prevent replay attacks
            const now = new Date();
            if (siwe.expirationTime && new Date(siwe.expirationTime) < now) {
              console.error("SIWE message has expired");
              return null;
            }
            if (siwe.issuedAt) {
              const issuedAt = new Date(siwe.issuedAt);
              const maxAge = 5 * 60 * 1000; // 5 minutes
              if (now.getTime() - issuedAt.getTime() > maxAge) {
                console.error("SIWE message is too old");
                return null;
              }
            }

            // Validate the signature and message fields
            await siwe.verify({
              signature: credentials.signature,
              domain,
              time: new Date().toISOString(),
            });

            // Compare recovered address with the provided one (canonicalize)
            const recovered = ethers.getAddress(siwe.address);
            const provided = ethers.getAddress(credentials.address);
            if (recovered !== provided) {
              console.error(
                "Address mismatch between SIWE message and provided address"
              );
              return null;
            }

            return {
              id: recovered,
              name: recovered,
              address: recovered,
            };
          } else if (isStarknetAddress) {
            // Process Starknet wallet authentication

            // For Starknet, we simply verify the message contains our expected format
            // and trust the signature verification done by the wallet
            if (
              !credentials.message.includes(
                "Sign this message to authenticate with ZeroXBridge"
              )
            ) {
              console.error(
                "Invalid message format for Starknet authentication"
              );
              return null;
            }

            // For now, we'll simply authenticate Starknet users by their address
            // In production, you'd want to implement proper Starknet signature verification
            return {
              id: credentials.address,
              name: credentials.address,
              address: credentials.address,
            };
          } else {
            console.error("Invalid address format - neither ETH nor Starknet");
            return null;
          }
        } catch (error) {
          console.error("Signature verification failed:", error);
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.address = user.address;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.address = token.address as string;
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth/signin",
    error: "/auth/error",
  },
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
