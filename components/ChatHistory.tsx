import React from 'react';

interface ChatHistoryProps {
  titles: string[];
}

const ChatHistory: React.FC<ChatHistoryProps> = ({titles}) => {

  return (
    <div>
      {titles.map((title,index) =>{
          return (
            <div className="flex items-center mb-2" key={index}>
                <div className="h-8 w-8 rounded-full mr-2" />
                <p>{title}</p>
            </div>
          );
        })}
      
    </div>
  );
};

export default ChatHistory;
