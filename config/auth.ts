import { NextAuthOptions } from "next-auth";

import CredentialsProvider  from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google"

import { Compare } from "./encryption";
import { prisma } from "./db";

interface User{
    userID: number,
    email: string,
    name: string,
    password: string,
}

export const authConfig: NextAuthOptions = {
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
            async authorize(credentials, req) {
                if(!credentials || !credentials.email || !credentials.password) return null;
                const user = await prisma.user.findFirst({
                    where: {email: credentials.email},
                });

                if(user && await Compare(credentials.password, user.password)){
                    return user as any;
                }
                return null;
            },
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }),
    ],
    session: {
        strategy: 'jwt'
    }
}
