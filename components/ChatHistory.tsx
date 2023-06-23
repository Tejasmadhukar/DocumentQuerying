import React from 'react';

const ChatHistory: React.FC = () => {
  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Chat History</h2>
      {/* Display Chat History Titles */}
      {/* Example: */}
      <div className="flex items-center mb-2">
        <div className="bg-gray-300 h-8 w-8 rounded-full mr-2" />
        <p>Chat History Title 1</p>
      </div>
      <div className="flex items-center mb-2">
        <div className="bg-gray-300 h-8 w-8 rounded-full mr-2" />
        <p>Chat History Title 2</p>
      </div>
      {/* Add more chat history titles here */}
    </div>
  );
};

export default ChatHistory;
