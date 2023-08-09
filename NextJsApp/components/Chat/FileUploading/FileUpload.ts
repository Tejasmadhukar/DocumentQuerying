'use server'
import { authConfig } from "@/config/auth";
import { prisma } from "@/config/db";
import { getServerSession } from "next-auth";

export async function createChatgroup(title: string) {
    const session = await getServerSession(authConfig)
    if(!session) throw Error('Not Logged in')

    const ChatGroup = await prisma.messageGroup.create({
        data:{
            'userId': session.user.id,
            'Title': title,
        }
    })
    return ChatGroup;
}