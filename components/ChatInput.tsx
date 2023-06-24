import React, { useState } from 'react';
import { Input } from '@nextui-org/input';
import { Button } from '@nextui-org/button';
interface ChatInputProps {
  onSendMessage: (message: string) => void;
}

const ChatInput: React.FC<ChatInputProps> = ({onSendMessage}) => {
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
    <form onSubmit={handleSubmit}>
      <div className="flex items-center mt-4">
        <Input
          placeholder="Type your message..."
          className="flex-grow rounded-l-lg py-2 px-1"
          onChange={handleChange}
          value={message}
        />
        <Button
          size='lg'
          color="success" 
          className="py-2 rounded-r-lg"
        >
          Send
        </Button>


      </div>
    </form>
  );
};

export default ChatInput;
