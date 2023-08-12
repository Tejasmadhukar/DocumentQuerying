'use client'
import { Spinner } from "@nextui-org/react";
import { Message } from "@prisma/client";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useRef } from "react";
import ChatInput from "./ChatInput";
import TextMessage from "./Text";

async function getMessages(group: string) {
    const res = await fetch(`/api/chat/${group}`);
    if (!res.ok) {
        console.log(res)
    } else {
        return await res.json()
    }
}

export default function ChatPage({groupId} : {groupId: string}) {
    const {data, isLoading} = useQuery<Message[]>(['messages'], () => getMessages(groupId))
    const queryClient = useQueryClient()
    const bottomRef = useRef<HTMLDivElement>(null)

    useEffect(()=>{
        bottomRef.current?.scrollIntoView({behavior: 'smooth'});
    },[])

    useEffect(()=>{
        bottomRef.current?.scrollIntoView({behavior: 'smooth'});
    },[data])

    const ScrollintoView = () => {
        bottomRef.current?.scrollIntoView({behavior: 'smooth'});
    }

    if(isLoading) return <div className="flex justify-center items-center"><Spinner /></div>

    if(!data) return <h1>No corresponding text messages exsist !!</h1>

    if(data.length === 0){
        const previousMessages = queryClient.getQueryData<Message[]>(['messages'])
        const welcomeMessage:Message = {id: 'first', created_by: 'bot', content_message: 'You can query your files now !!', groupId, updated_at: new Date()}

        let updatedMessages:Message[] = []
        if(previousMessages){
            updatedMessages = [...previousMessages, welcomeMessage]
        }
        queryClient.setQueryData<Message[]>(['messages'], updatedMessages)
    }
    
    return (
        <div className="flex w-full flex-col h-screen message group">
            <div className="flex-1 overflow-y-auto">
                {data.map((message,index)=>
                    <TextMessage key={index} message={message}/>
                )}
                <div ref={bottomRef} />
            </div>
            
            <ChatInput scrollFunction={ScrollintoView} groupId={groupId}/>
        </div>
    )
}