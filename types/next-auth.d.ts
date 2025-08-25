import NextAuth from "next-auth"

declare module "next-auth" {
  interface Session {
    user: {
      address: string
      name?: string | null
      email?: string | null
      image?: string | null
    }
  }

  interface User {
    address: string
    name?: string | null
    email?: string | null
    image?: string | null
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    address: string
  }
}