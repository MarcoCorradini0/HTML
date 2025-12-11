// src/app/api/auth/[...nextauth]/route.ts
import NextAuth from "next-auth"
import { authOptions } from "./authOptions"

// crea il handler
const handler = NextAuth(authOptions)

// esporta GET e POST per App Router
export { handler as GET, handler as POST }
