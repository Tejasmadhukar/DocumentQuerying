import { backendUrl } from "@/config/site";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { Message } from "@prisma/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { SendIcon } from "../icons";

interface ChatInputProps {
    groupId: string;
    scrollFunction: () => void;
}

const ChatInput: React.FC<ChatInputProps> = ({groupId, scrollFunction}) => {
    const queryClient = useQueryClient();   
    const [inputMessage, setinputMessage] = useState('');

    const saveHumanMessage = async(message: string) => {
        const request_body = {
            content_message: message,
            created_by: 'user'
        }
        try {
            const res = await fetch(`/api/chat/${groupId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(request_body)
            })
    
            if(!res.ok) {
                throw new Error('Saving to database failed')
            }
        } catch (error) {
            console.error(error)
            throw new Error('Saving to database failed')
        }
    }

    const saveBotMessage = async(message: string) => {
        const request_body = {
            content_message: message,
            created_by: 'bot'
        }
        try {
            const res = await fetch(`/api/chat/${groupId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(request_body)
            })
    
            if(!res.ok) {
                throw new Error('Saving to database failed')
            }
        } catch (error) {
            console.error(error)
            throw new Error('Saving to database failed')
        }
    }

    const FetchResponse = async (message: string)  => {
        setinputMessage('')
        scrollFunction()
        let previousMessages = queryClient.getQueryData<Message[]>(['messages'])

        let HumanMessage: Message = {'content_message': message, groupId, 'created_by': 'user', 'id': 'client_human_message', 'updated_at': new Date()}

        if(previousMessages){
            previousMessages = [...previousMessages, HumanMessage]
        }
    
        queryClient.setQueryData<Message[]>(['messages'], previousMessages)

        previousMessages = queryClient.getQueryData<Message[]>(['messages'])
        let ThinkingMessage: Message = {'content_message': 'Thinking......', groupId, 'created_by': 'bot', 'id': 'client_thinking_message', 'updated_at': new Date()}

        if(previousMessages){
            previousMessages = [...previousMessages, ThinkingMessage]
        }
    
        queryClient.setQueryData<Message[]>(['messages'], previousMessages)

        scrollFunction()
        
        const postData = {
            message: message,
            id: groupId,
        };

        const myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');

        const response = await fetch(`${backendUrl}/run`, {
            method: 'POST',
            body: JSON.stringify(postData),
            headers: myHeaders,
        });

        if (!response.body) throw Error('failed to fetch response');
    
        const reader = response.body.pipeThrough(new TextDecoderStream()).getReader();

        let UpdatedMessage: Message = {'content_message': ' ', groupId, 'created_by': 'bot', 'id': 'message_streamed_in', 'updated_at': new Date()};

        previousMessages = queryClient.getQueryData<Message[]>(['messages'])
        previousMessages?.pop()

        if(previousMessages){
            previousMessages = [...previousMessages, UpdatedMessage]
        }
        
        let data = ''
        // eslint-disable-next-line no-constant-condition
        while (true) {
            const { value, done } = await reader.read();
            if (done) break;
            data = data + value;
            let streamedMessage: Message = {'content_message': data, groupId, 'created_by': 'bot', 'id': 'message_streamed_in', 'updated_at': new Date()}
        
            if(previousMessages){
                previousMessages[previousMessages.length-1] = streamedMessage
            }
            queryClient.setQueryData<Message[]>(['messages'], previousMessages)
            scrollFunction();
        }
        await saveBotMessage(data);
    }

    const newMessageMutation = useMutation({
        mutationFn: FetchResponse,
        onMutate: async(message: string) => {
            await queryClient.cancelQueries({queryKey: ['messages']})
            await saveHumanMessage(message)
        },

        onError: () => {
            alert('There was an error fetching response and saving messages, please run your query again')
        },

        onSettled: async() => {
            queryClient.invalidateQueries(['messages'])
        }
    })
    
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setinputMessage(event.target.value)
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        newMessageMutation.mutate(inputMessage);
    };

    return (
        <div className="sticky bottom-1 z-20 bg-opacity-80 backdrop-filter backdrop-blur-md">
            <form onSubmit={handleSubmit} className="mx-2 gap-3 last:mb-2 md:mx-auto md:last:mb-6 lg:mx-auto lg:max-w-2xl xl:max-w-3xl">
                <Input 
                placeholder="Type your message here"
                color="default"
                onChange={handleChange}
                value={inputMessage}
                endContent={<Button
                                isIconOnly
                                variant="light"
                                type="submit"
                            >
                                <SendIcon />
                            </Button>}
                />
            </form>
        </div>
    )
}

export default ChatInput;