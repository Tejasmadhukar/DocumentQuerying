import { authConfig } from "@/config/auth";
import { prisma } from "@/config/db";
import { getServerSession } from 'next-auth';

export async function GET(req: Request,{params}: {params:{id:string}}) {
    const session = await getServerSession(authConfig);
    const groupId = params.id

    if(!session){
        return new Response('Session not found',{status: 401})
    }

    try {
        const titles = await prisma.message.findMany({
            where:{groupId}
        })
        return new Response(JSON.stringify(titles), { status: 200 })
    } catch (error) {
        return new Response('Failed to fetch', { status: 500 })
    }
}

export async function POST(request: Request,{params}: {params:{id:string}}){
    const session = await getServerSession(authConfig);
    const req = await request.json();

    if(!session){
        return new Response('Not authenticated, forbidden',{status: 403})
    }

    try {
        const messageResponse = await prisma.message.create({
            data:{
                'groupId': params.id,
                'content_message': req.content_message,
                'created_by': req.created_by,
            },
        })
        return new Response('message created successfully', { status: 201 })
    } catch (error) {
        return new Response('Failed to make mutation in database', { status: 500 })
    }

}