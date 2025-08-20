import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { ethers } from "ethers"

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      id: "ethereum",
      name: "Ethereum",
      credentials: {
        address: { label: "Address", type: "text" },
        signature: { label: "Signature", type: "text" },
        message: { label: "Message", type: "text" },
      },
      async authorize(credentials) {
        if (!credentials?.address || !credentials?.signature || !credentials?.message) {
          return null
        }

        try {
          // Verify the signature
          const recoveredAddress = ethers.verifyMessage(
            credentials.message,
            credentials.signature
          )

          // Check if the recovered address matches the provided address
          if (recoveredAddress.toLowerCase() === credentials.address.toLowerCase()) {
            return {
              id: credentials.address,
              name: credentials.address,
              email: `${credentials.address}@ethereum.wallet`,
              address: credentials.address,
            }
          }

          return null
        } catch (error) {
          console.error("Signature verification failed:", error)
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