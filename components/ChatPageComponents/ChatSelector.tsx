"use client"
import NotAllowedChat from "@/components/ChatPageComponents/UnAuthenticatedChat";
import AllowedChatPage from "@/components/ChatPageComponents/AuthenticatedChat";
import { useSession } from "next-auth/react";
export default function ChatSelector() {
    const session = useSession();
    return (
        <>
        {session.status=="authenticated" ? (
            <AllowedChatPage />
        ) : (
            <NotAllowedChat />
        )}
        </>
    )
}
