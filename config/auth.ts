import { NextAuthOptions } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";

import CredentialsProvider  from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google"

import { Compare } from "./encryption";
import { prisma } from "./db";
import { Adapter } from "next-auth/adapters";

export const authConfig: NextAuthOptions = {
    adapter: PrismaAdapter(prisma) as Adapter,
    providers: [
        CredentialsProvider({
            name: "Sign In",
            credentials: {
                email: {
                    label: "Email",
                    type: "email"
                },
                password: { label: "Password", type: "password"}
            },

            async authorize(credentials) {
                if(!credentials || !credentials.email || !credentials.password) return null;

                const user = await prisma.user.findFirst({
                    where: {email: credentials.email},
                });

                if(user && await Compare(credentials.password, user.password)){
                    return user as any ;
                }
                return null;
            },
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }),
    ],
    callbacks: {
        async session({ session, user }) {
            session.user.id = user.id
            return session
          }
      }
}
