import NotAllowedChat from "@/components/ChatPageComponents/UnAuthenticatedChat";
import AllowedChatPage from "@/components/ChatPageComponents/AuthenticatedChat";
export default function ChatSelector({ session }: { session: any }) {
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
