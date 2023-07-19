'use client'
import { MessageGroup } from "@/types";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import axios from "axios";
import React, { useState } from "react";
import { SendIcon } from "../icons";

interface ChatInputProps {
    onSendMessage: (message: MessageGroup) => void;
    MessageLength: number;
    Loading : (key: boolean) => void;
}

const ChatInput: React.FC<ChatInputProps> = ({onSendMessage, MessageLength, Loading}) => {
    const [message, setMessage] = useState('');

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setMessage(event.target.value);
    };

    const FetchResponse = async (query: string) : Promise<string> => {
        try {
            const response = await axios.post('https://backend-test-58bq.onrender.com/run', { message: query }, { headers: { 'Content-Type': 'application/json' } });
            console.log(response)
            return response.data;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
    
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (message.trim() !== '') {
            onSendMessage({message, user: 'human'});
            setMessage('');
            Loading(true);
            FetchResponse(message).then((data)=>{
                Loading(false);
                onSendMessage({message: data, user: 'bot'});
            }).catch((Error)=>alert(Error));
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