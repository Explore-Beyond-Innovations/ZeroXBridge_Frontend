import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { ethers } from "ethers"
import { SiweMessage } from "siwe"

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
        if (!credentials?.address || !credentials?.signature || !credentials?.message || !credentials?.nonce) {
          return null
        }

        try {
          // Input validation guards
          // 1. Verify credentials.address is a valid EVM address
          if (!ethers.isAddress(credentials.address)) {
            console.error("Invalid EVM address format")
            return null
          }

          // 2. Ensure credentials.signature is a 65-byte hex string (0x-prefixed, 132 characters)
          const signatureRegex = /^0x[a-fA-F0-9]{130}$/
          if (!signatureRegex.test(credentials.signature)) {
            console.error("Invalid signature format - must be 65-byte hex string")
            return null
          }

          // 3. Enforce sane credentials.message length limit (max 1024 chars)
          if (credentials.message.length > 1024) {
            console.error("Message too long - exceeds 1024 character limit")
            return null
          }

          // Parse and verify SIWE message
          const siwe = new SiweMessage(credentials.message)
          const domain = new URL(process.env.NEXTAUTH_URL ?? req.headers?.origin ?? "").host

          // Validate the signature and message fields
          await siwe.verify({
            signature: credentials.signature,
            domain,
            time: new Date().toISOString(),
          })

          // Bind nonce to NextAuth's CSRF token for anti-replay
          const csrfCookie = req?.headers?.cookie?.split(';').find(c => c.trim().startsWith('next-auth.csrf-token='))
          const csrfToken = csrfCookie ? decodeURIComponent(csrfCookie.split('=')[1]).split('|')[0] : undefined
          if (!csrfToken || siwe.nonce !== csrfToken) {
            console.error("Nonce validation failed - potential replay attack")
            return null
          }

          // Compare recovered address with the provided one (canonicalize)
          const recovered = ethers.getAddress(siwe.address)
          const provided = ethers.getAddress(credentials.address)
          if (recovered !== provided) {
            console.error("Address mismatch between SIWE message and provided address")
            return null
          }

          return {
            id: recovered,
            name: recovered,
            // Avoid fabricating an email; leave undefined to prevent downstream email flows
            address: recovered,
          }
        } catch (error) {
          console.error("SIWE verification failed:", error)
          return null
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
        token.address = user.address
      }
      return token
    },
    async session({ session, token }) {
      if (token) {
        session.user.address = token.address as string
      }
      return session
    },
  },
  pages: {
    signIn: "/auth/signin",
    error: "/auth/error",
  },
  secret: process.env.NEXTAUTH_SECRET,
})

export { handler as GET, handler as POST }