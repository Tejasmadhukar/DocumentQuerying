'use client'
import { useState } from "react";
import ChatInput from "./ChatInput";
import TextMessage from "./Text";

export default function Chat() {
    const [messages, setMessages] = useState<string[]>(['h1','test 1','test 2']);

    const handleSendMessage = (message: string) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    };
    
    return (
        <>
            <div className="flex flex-col h-screen message group">
                {messages.length <= 0 ? (
                    <>
                    </>
                ) : (
                    <TextMessage Messages={messages}/>
                )}
                
                <ChatInput onSendMessage={handleSendMessage}/>
            </div>
        </>
    )
}