import { dehydrate, Hydrate } from "@tanstack/react-query"
import getQueryClient from "@/app/getQueryClient"
import { prisma } from "@/config/db"
import ChatPage from "@/components/Chat/Chat"

async function getInitialMessages (groupId: string) {
    const messages = await prisma.message.findMany({
        where:{groupId}
    })
    return messages
}

export default async function Chat ({params}: {params: {id: string}}) {
    const queryClient = getQueryClient()
    await queryClient.prefetchQuery(['posts', params.id], () => getInitialMessages(params.id))
    const dehydratedState = dehydrate(queryClient)

    return (
        <>
            <Hydrate state={dehydratedState}>
                <ChatPage groupId={params.id}/>
            </Hydrate>
        </>
    )
}