import { authConfig } from "@/config/auth";
import { getServerSession } from "next-auth"
import NotAllowedChat from "@/components/UnAuthenticatedChat";
import AllowedChatPage from "@/components/AuthenticatedChat";
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
