import { authConfig } from "@/config/auth";
import { prisma } from "@/config/db";
import { getServerSession } from 'next-auth';

export async function GET(req: Request) {
    const session = await getServerSession(authConfig);

    if(!session){
        return new Response('Session not found',{status: 401})
    }

    try {
        const titles = await prisma.messageGroup.findMany({
            where:{'userId': session.user.id}
        })
        return new Response(JSON.stringify(titles), { status: 200 })
    } catch (error) {
        return new Response('Failed to fetch', { status: 500 })
    }
}