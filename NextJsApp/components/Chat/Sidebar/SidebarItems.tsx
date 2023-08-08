'use client'
import { Spinner } from "@nextui-org/react"
import { MessageGroup } from "@prisma/client"
import { useQuery } from "@tanstack/react-query"

import SidebarItem from "./SidebarItem"

interface SidebarItemsProps {
    userId: string,
}

async function getTitles() {
    const res = await fetch('/api/titles');
    if (!res.ok) {
        console.log(res)
    } else {
        return await res.json()
    }
}

export default function SidebarItems (props: SidebarItemsProps){
    const {data, isLoading} = useQuery<MessageGroup[]>(['title'], () => getTitles())

    if(isLoading) return <div className="mt-10"><Spinner /></div>

    return (
        <>
            
            
            {data?.map((title,index)=>(
                <SidebarItem key={index} title={title} />
            ))}
        </>
    )
}

