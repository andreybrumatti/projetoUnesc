// app/api/auth/[...nextauth]/route.ts
import NextAuth, { NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from "next-auth/providers/credentials";
import {getUsers} from "@/lib/utils";
import { toast } from 'sonner';

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),

    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          toast.error('Email and Password required');
        }

        const users = await getUsers();
        
        const user = users.find((user: { email: string; }) => user.email === credentials?.email);

        if (!user || !user.password) {
          toast.error('Email does not exist');
        }

        if (credentials?.password !== user.password) {
          toast.error('Incorrect password');
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
        };
      }
    }),
    
  ],
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/signin',
  },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
