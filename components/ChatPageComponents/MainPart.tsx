'use client'
import { useState } from "react";
import ChatInput from "./ChatInput";
import TextMessage from "./Text";
export default function Chat() {
    const [messages, setMessages] = useState<string[]>([]);

    const handleSendMessage = (message: string) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    };
    
    return (
        <>
            <div className=" w-3/4 flex flex-col message group and chat input">
                <TextMessage />
                <ChatInput onSendMessage={handleSendMessage}/>
            </div>

            
        </>
    )
}