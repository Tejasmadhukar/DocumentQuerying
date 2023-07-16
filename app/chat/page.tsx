import AllowedChatPage from "@/components/ChatPageComponents/AuthenticatedChat";
import NotAllowedChat from "@/components/ChatPageComponents/UnAuthenticatedChat";
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