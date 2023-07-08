import { Avatar, Spacer } from "@nextui-org/react";
import { FC, useEffect, useRef } from "react";
import { useSession } from "next-auth/react";
import { MessageGroup } from "@/types";
import { Progress } from "@nextui-org/react";

interface ChatMessageProps {
    Messages: MessageGroup[];
}

const TextMessage:FC<ChatMessageProps> = ({ Messages }) => {
    const session = useSession();
    const bottomRef = useRef<HTMLDivElement>(null)

    const botImage = "https://img.freepik.com/free-vector/cute-robot-wearing-hat-flying-cartoon-vector-icon-illustration-science-technology-icon-isolated_138676-5186.jpg?w=1380&t=st=1688759864~exp=1688760464~hmac=42c7b731fbc68ac619351dc8e506083a8d19d06169b3a65f6c6b33e96034e504"

    useEffect(() => {
        bottomRef.current?.scrollIntoView({behavior: 'smooth'});
      }, [Messages]);

    return (
        <>
            <div className="flex-1 overflow-y-auto">
                {Messages.map((message,index)=>(
                    <>
                        {message.user=='bot' ? (
                            <div key={index} className="w-full bg-slate-100 dark:bg-slate-900  border-b-1  dark:border-gray-700">
                                <div className="flex p-4 gap-4 text-base md:gap-6 md:max-w-2xl lg:max-w-[38rem] xl:max-w-3xl md:py-6 lg:px-0 m-auto">
                                    <div className="flex-shrink-0 flex flex-col relative items-end">
                                        <Avatar radius="md" name="Bot" src={botImage} />
                                    </div>
                                    {typeof message.message !== 'string' ? <> <Spacer y={10}/> <Progress style={{width: '200px'}}  className="w-8" size="sm" isIndeterminate color="secondary"/> </> : <p>{message.message}</p>}
                                </div>
                            </div>
                        ) : (
                            <div key={index} className="w-full ">
                                <div className="flex p-4 gap-4 text-base md:gap-6 md:max-w-2xl lg:max-w-[38rem] xl:max-w-3xl md:py-6 lg:px-0 m-auto">
                                    <div className="flex-shrink-0 flex flex-col relative items-end">
                                        <Avatar radius="md" name={session.data?.user?.name || "User"} src={session.data?.user?.image || "https://i.pravatar.cc/150?u=a04258a2462d826712d"} />
                                    </div>
                                    {typeof message.message === 'string' && <p>{message.message}</p>}
                                </div>
                            </div>
                        )}
                    </>
                ))}
                <div ref={bottomRef} />
            </div>
        </>
    )
}

export default TextMessage