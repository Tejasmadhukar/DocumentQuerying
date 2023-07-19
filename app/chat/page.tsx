import AllowedChatPage from "@/components/Chat/AllowedChat";
import NotAllowedChat from "@/components/Chat/NotAllowedChat";
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