'use client'
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { SendIcon } from "../icons";
import React, { useState } from "react";

interface ChatInputProps {
    onSendMessage: (message: string) => void;
    MessageLength: number;
}

const ChatInput: React.FC<ChatInputProps> = ({onSendMessage, MessageLength}) => {
    const [message, setMessage] = useState('');

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setMessage(event.target.value);
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (message.trim() !== '') {
            onSendMessage(message);
            setMessage('');
        }
    };
      

    return (
        <div className="sticky bottom-1 z-20 bg-opacity-80 backdrop-filter backdrop-blur-md">
                {MessageLength <= 0 ? (
                    <form onSubmit={handleSubmit} className="mx-2  cursor-not-allowed gap-3 last:mb-2 md:mx-auto md:last:mb-6 lg:mx-auto lg:max-w-2xl xl:max-w-3xl">
                        <Input 
                        isDisabled
                        placeholder="Please upload files first"
                        color="danger"
                        onChange={handleChange}
                        value={message}
                        endContent={<Button
                                        isIconOnly
                                        variant="light"
                                        type="submit"
                                    >
                                        <SendIcon />
                                    </Button>}
                        />
                    </form>
                ) : (
                    <form onSubmit={handleSubmit} className="mx-2 gap-3 last:mb-2 md:mx-auto md:last:mb-6 lg:mx-auto lg:max-w-2xl xl:max-w-3xl">
                        <Input 
                        placeholder="Type your message here"
                        color="default"
                        onChange={handleChange}
                        value={message}
                        endContent={<Button
                                        isIconOnly
                                        variant="light"
                                        type="submit"
                                    >
                                        <SendIcon />
                                    </Button>}
                        />
                    </form>
                )}
                

        </div>
    )
}

export default ChatInput;