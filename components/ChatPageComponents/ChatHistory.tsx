import React, {useState} from 'react';

interface ChatHistoryProps {
  titles: string[];
}

const ChatHistory: React.FC<ChatHistoryProps> = ({titles}) => {

  const [selectedTitle, setSelectedTitle] = useState<string | null>(null);

  const handleClick = (title: string) => {
    setSelectedTitle(title === selectedTitle ? null : title);
  };

  return (
    <div>
      {titles.map((title, index) => {
        const isSelected = title === selectedTitle;

        return (
          <div
            className={`flex items-center mb-2 rounded-full cursor-pointer ${
              isSelected ? 'bg-slate-200 dark:bg-slate-800' : 'hover:bg-slate-200'
            } dark:hover:bg-slate-800`}
            key={index}
            onClick={() => handleClick(title)}
          >
            <div className="h-8 w-8 rounded-full mr-2 bg" />
            <p>{title}</p>
          </div>
        );
      })}
    </div>
  );
};

export default ChatHistory;
