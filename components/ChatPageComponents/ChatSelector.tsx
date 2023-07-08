"use client"
import AllowedChatPage from "@/components/ChatPageComponents/AuthenticatedChat";
import NotAllowedChat from "@/components/ChatPageComponents/UnAuthenticatedChat";
import { Spinner } from "@nextui-org/react";
import { useSession } from "next-auth/react";
export default function ChatSelector() {
    const session = useSession();
    return (
        <>
        {session.status=="authenticated" ? (
            <AllowedChatPage />
        ) : session.status=="unauthenticated" ? (
            <NotAllowedChat />
        ) : (
            <div  style={{height: '100vh', display: 'flex', justifyContent: 'center', alignContent: 'center' }}>
                <Spinner label="Loading..." size="xl" color="warning" />
            </div>
        )}
  
        </>
    )
}