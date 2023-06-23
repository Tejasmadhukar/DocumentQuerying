'use client'
import React, {useState} from 'react';
import ChatHistory from '@/components/ChatHistory';
import ChatInput from '@/components/ChatInput';
import { Button } from '@nextui-org/button';


const ChatPage: React.FC = () => {
  const [titles, setTitles] = useState<string[]>(['lmao test title 1', 'lmao test title 2']);
  
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
        <div className="h-screen flex flex-col bg-gray-200 p-4">
          {/* Chat Screen */}
          <div className="flex-1 flex flex-col-reverse overflow-y-auto">
            {/* Display Chat Messages */}
            {/* Example: */}
            <div className="mb-2">
              <div className="bg-white p-2 rounded-lg">
                <p>Chat message 1</p>
              </div>
            </div>
            <div className="mb-2">
              <div className="bg-white p-2 rounded-lg">
                <p>Chat message 2</p>
              </div>
            </div>
            {/* Add more chat messages here */}
          </div>
          {/* Chat Input */}
          <div className="sticky bottom-10">
            <ChatInput />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
