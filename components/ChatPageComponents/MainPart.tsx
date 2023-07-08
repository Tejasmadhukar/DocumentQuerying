'use client'
import { useState } from "react";
import ChatInput from "./ChatInput";
import TextMessage from "./Text";
import Upload from "./Welcome";

export default function Chat() {
    // const [messages, setMessages] = useState<string[]>(['Embeddings Done', 'Ask any questoin from the document that you want']);
    const [messages, setMessages] = useState<string[]>([]);

    const handleSendMessage = (message: string) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    };
    
    return (
        <>
            <div className="flex flex-col h-screen message group">
                {messages.length <= 0 ? (
                    <Upload onSendMessage={handleSendMessage}/>
                ) : (
                    <TextMessage Messages={messages}/>
                )}

                <ChatInput onSendMessage={handleSendMessage} MessageLength={messages.length}/>
            </div>
        </>
    )
}