import { prisma } from "@/config/db"
import ChatPage from "@/components/Chat/Chat"
import { GoodSpinner } from "@/components/NextuiClient"

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
    const messages = await getInitialMessages(params.id);

    return (
        <>
            {/* Messages will go in chatpage into react state where they will be preserved on soft navigation */}
            {/* React query will handle Query and mutation using SetMessages setter on client side entirely */}
            {/* <ChatPage groupId={params.id}/> */}
        </>
    )
}