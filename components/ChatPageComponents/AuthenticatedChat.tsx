'use client'
import React, {useState} from 'react';
import ChatHistory from '@/components/ChatPageComponents/ChatHistory';
import ChatInput from '@/components/ChatPageComponents/ChatInput';
import { Button } from '@nextui-org/button';
import { Avatar, Spacer } from '@nextui-org/react';

const AllowedChatPage: React.FC = () => {
  const [titles, setTitles] = useState<string[]>([]);
  const [messages, setMessages] = useState<string[]>([]);

  const handleSendMessage = (message: string) => {
    setMessages((prevMessages) => [...prevMessages, message]);
  };

  return (
    <>
      <div className=" w-1/6 ">
          <div className="p-4">
            <Button variant='shadow' color='secondary' className='py-2 px-4 mb-4 w-full'>
                New Chat
            </Button>
            <ChatHistory titles={titles}/>
          </div>
      </div>

      <div className="w-3/4 h-screen flex flex-col justify-center ">


          <div className="flex-1 overflow-y-auto">
            {messages.map((message, index) => (
              <div className="mb-2 flex items-center" key={index}>
                  <Avatar
                    size="lg"
                    src="https://i.pravatar.cc/150?u=a042581f4e25056704b"
                  />
                  <Spacer x={1} />                    
                    <div className="bg-slate-200 dark:bg-slate-800 rounded-lg flex-grow p-2">
                      <p>{message}</p>
                    </div>      
                  <Spacer y={2}/>
              </div>
            ))}
          </div>

          <div className="sticky bottom-10">
            <ChatInput onSendMessage={handleSendMessage} />
          </div>

      </div>

    </>
  );
};

export default AllowedChatPage;
