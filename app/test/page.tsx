'use client'
import React, {useState} from 'react';
import ChatHistory from '@/components/ChatHistory';
import ChatInput from '@/components/ChatInput';
import { Button } from '@nextui-org/button';

const ChatPage: React.FC = () => {
  const [titles, setTitles] = useState<string[]>(['lmao test title 1', 'lmao test title 2']);
  const [messages, setMessages] = useState<string[]>(['msg test message 1', 'msg test message 2']);

  const handleSendMessage = (message: string) => {
    setMessages((prevMessages) => [...prevMessages, message]);
  };

  return (
    <div className="flex h-screen">
      <div className="w-1/4 ">
          <div className="p-4">
            <Button variant='shadow' color='secondary' className='py-2 px-4 mb-4 w-full'>
                New Chat
            </Button>
            {/* Chat History */}
            <ChatHistory titles={titles}/>
          </div>
      </div>
      
      <div className="w-3/4">
        {/* Main Part */}
        
        <div className="h-screen flex flex-col p-4"> 

          {/* Chat Screen */}
          <div className="flex-1 overflow-y-auto">
            {messages.map((message, index) => (
              <div className="mb-2" key={index}>
                <div className="p-2 rounded-lg">
                  <p>{message}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="sticky bottom-10">
            <ChatInput onSendMessage={handleSendMessage} />
          </div>

        </div>
      </div>
    </div>
  );
};

export default ChatPage;
