import { BinIcon } from "@/components/icons"
import { Spacer } from "@nextui-org/react"
import { MessageGroup } from "@prisma/client"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import Link from "next/link"
import { FC } from "react"

interface SidebarItemProps{
    title : MessageGroup
}

async function deleteTitle (id: string) {
    try {
        const res = await fetch(`/api/titles/${id}`,{
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        if(!res.ok) {
            throw new Error(`deletion failed: ${id}`)
        }
    } catch (error) {
        console.log(error)
        throw new Error('something went wrong, contact tejasmadhukar6@gmail.com')
    }
}

const SidebarItem:FC<SidebarItemProps> = ({title}) => {
    const queryClient = useQueryClient()

    const deleteMutation = useMutation({
        mutationFn: deleteTitle,
        onMutate: async (id) => {
            await queryClient.cancelQueries({ queryKey: ['title'] });
            const previousTitles = queryClient.getQueryData<MessageGroup[]>(['title'])

            let updatedTitles: MessageGroup[] = []
            if(previousTitles){
                updatedTitles = [...previousTitles].filter((deletion_title) => deletion_title.id !== id)
            }

            queryClient.setQueryData<MessageGroup[]>(['title'], updatedTitles)

            return { previousTitles };
        },

        onError: (context: {previousTitles?: MessageGroup[] | undefined}) => {
            queryClient.setQueryData<MessageGroup[]>(['title'], context.previousTitles)
        },

        onSettled: () => {
            queryClient.invalidateQueries(['title'])
        }
    })
    
    return (
        <>
            <div className=" group flex mt-6 cursor-pointer">
                <Link href={`/chat/${title.id}`}>{title.Title}</Link>
                <Spacer x={2}/>
                <div className="opacity-0 group-hover:opacity-100 transition-opacity" onClick={() => deleteMutation.mutate(title.id)} >
                    <BinIcon />
                </div>
                
            </div>
        </>
    )
}

export default SidebarItem;