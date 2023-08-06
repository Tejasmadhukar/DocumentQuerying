'use client'
import { MessageGroup } from "@/types";
import { useState } from "react";
import ChatInput from "./ChatInput";
import Upload from "./FileUploading/Upload";
import TextMessage from "./Text";

export default function ChatPage({groupId, InitialMessages} : {groupId: string, InitialMessages: MessageGroup[]}) {
    const [messages, setMessages] = useState<MessageGroup[]>([]);
    
    const handleSendMessage = (message: MessageGroup) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    };

    const SetLoading = (key: boolean) => {
        if(key){
            handleSendMessage({message: 1, user: 'bot'})
        }else{
            setMessages((prevMessages) => {
                const updatedMessages = [...prevMessages];
                updatedMessages.pop(); 
                return updatedMessages;
              });
        }
    }
    
    return (
        <>
            <div className="flex flex-col h-screen message group">
                {messages.length <= 0 ? (
                    <Upload />
                ) : (
                    <TextMessage Messages={messages}/>
                )}

                <ChatInput onSendMessage={handleSendMessage} MessageLength={messages.length} Loading={SetLoading}/>
            </div>
        </>
    )
}