import { Avatar } from "@nextui-org/react";
import { FC } from "react";

interface ChatMessageProps {
    Messages: string[];
}

const TextMessage:FC<ChatMessageProps> = ({ Messages }) => {
    return (
        <>
            <div className="flex-1 overflow-y-auto">
                {Messages.map((message,index)=>(
                    <>
                        <div key={index} className="w-full bg-slate-100 dark:bg-slate-900  border-b-1  dark:border-gray-700">
                            <div className="flex p-4 gap-4 text-base md:gap-6 md:max-w-2xl lg:max-w-[38rem] xl:max-w-3xl md:py-6 lg:px-0 m-auto">
                                <div className="flex-shrink-0 flex flex-col relative items-end">
                                    <Avatar radius="md" src="https://i.pravatar.cc/150?u=a04258a2462d826712d" />
                                </div>
                                <p>{message}</p>
                            </div>
                            
                        </div>
                    </>
                ))}
            </div>
        </>
    )
}

export default TextMessage