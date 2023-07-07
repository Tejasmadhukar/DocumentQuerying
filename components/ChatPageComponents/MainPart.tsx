'use client'
import { useState } from "react";
export default function Chat() {
    const [messages, setMessages] = useState<string[]>([]);

    const handleSendMessage = (message: string) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    };
    
    return (
        <>
        </>
    )
}