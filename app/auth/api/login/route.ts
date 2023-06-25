import Compare from "@/config/compare";
import { prisma } from "@/config/db";
import { NextResponse } from "next/server";

export interface LoginParams{
    email: string,
    password: string
}

export async function POST(request: Request) {
    const loginParams: LoginParams = await request.json();
    try {
        const user = await prisma.user.findUnique({
            where:{
                'email': loginParams.email
            }
        })
        if (user) {
            if (await Compare(loginParams.password, user.password)) {
              return NextResponse.json({ user, token: "goofyaaa" }, { status: 200 });
            } else {
              return NextResponse.json({ message: "Invalid Credentials" }, { status: 401 });
            }
          } else {
            return NextResponse.json({ message: "User Does not exist. Please Signup" },{ status: 401 });
          }
        
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "An error occurred while fetching login details." },{ status: 500 });
    }
}