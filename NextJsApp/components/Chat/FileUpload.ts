'use server'
import { prisma } from "@/config/db";
import { authConfig } from "@/config/auth";
import { getServerSession } from "next-auth";


export async function createChatgroup(id:string, title: string) {
    const ChatGroup = await prisma.messageGroup.create({
        data:{
            'userId': id,
            'Title': title,
        }
    })
    return ChatGroup;
}

export async function Getsession() {
    const session = await getServerSession(authConfig);
    return session
}