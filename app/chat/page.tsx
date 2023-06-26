import NotAllowedChat from "@/components/ChatPageComponents/UnAuthenticatedChat";
import AllowedChatPage from "@/components/ChatPageComponents/AuthenticatedChat";
import { getServerSession } from "next-auth";
import { authConfig } from "@/config/auth";
export default async function Chat () {
  const session = await getServerSession(authConfig);
  return (
    <>
        {!session ? (
            <NotAllowedChat />
        ) : (
            <AllowedChatPage />
        )}
    </>
  )
}
