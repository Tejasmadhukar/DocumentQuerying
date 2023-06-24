import { NextResponse } from "next/server";
import { prisma } from "@/db";
import encryptPassword from "@/config/hash";

interface SignUpType{
    name: string,
    email: string,
    password: string
}

export async function POST(request: Request) {
    const Signup: SignUpType = await request.json();
    try {
        const check = await prisma.user.findUnique({
            where:{
                'email': Signup.email
            }
        })
        if (check) return NextResponse.json({"message": "User already exists"}, {status: 400});

        const hash_password = await encryptPassword(Signup.password);

        const new_user = await prisma.user.create({
            data:{
                'name': Signup.name,
                'email': Signup.email,
                'password': hash_password
            }
        })

        return NextResponse.json({"message":"Signup Successful"}, {status: 201})

    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "An error occurred while fetching login details." },{ status: 500 });
    }
}