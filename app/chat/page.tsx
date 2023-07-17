import AllowedChatPage from "@/components/ChatPageComponents/AllowedChat";
import NotAllowedChat from "@/components/ChatPageComponents/NotAllowedChat";
import { authConfig } from "@/config/auth";
import { getServerSession } from "next-auth";

export default async function Chat () {
  const session = await getServerSession(authConfig);

    return (
        <>
        {session ? (
            <AllowedChatPage />
        ) : (
            <NotAllowedChat />
        )}
  
        </>
    )
}