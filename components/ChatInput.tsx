import React from 'react';

const ChatInput: React.FC = () => {
  const handleSendMessage = () => {
    // Handle sending the message
  };

  return (
    <div className="flex items-center mt-4">
      <input
        type="text"
        placeholder="Type your message..."
        className="flex-grow border border-gray-300 rounded-l-lg py-2 px-4"
      />
      <button
        className="bg-blue-500 text-white py-2 px-4 rounded-r-lg"
        onClick={handleSendMessage}
      >
        Send
      </button>
    </div>
  );
};

export default ChatInput;
