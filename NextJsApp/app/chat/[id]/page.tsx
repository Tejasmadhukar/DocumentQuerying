import getQueryClient from "@/app/getQueryClient";
import ChatPage from "@/components/Chat/Chat";
import { prisma } from "@/config/db";
import { Hydrate, dehydrate } from "@tanstack/react-query";

async function getInitialMessages (groupId: string) {
    try {
        const messages = await prisma.message.findMany({
            where:{groupId}
        })
        return messages
    } catch (error) {
        throw error
    }
}

export default async function Chat ({params}: {params: {id: string}}) {
    const groupId = params.id;

    const queryCLient = getQueryClient();
    await queryCLient.prefetchQuery(['messages'], () => getInitialMessages(groupId))

    const dehydratedState = dehydrate(queryCLient)

    return (
        <>
            <Hydrate state={dehydratedState}>
                <ChatPage groupId={groupId}/>
            </Hydrate>
        </>
    )
}