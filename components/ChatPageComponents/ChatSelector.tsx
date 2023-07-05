"use client"
import NotAllowedChat from "@/components/ChatPageComponents/UnAuthenticatedChat";
import AllowedChatPage from "@/components/ChatPageComponents/AuthenticatedChat";
import { useSession } from "next-auth/react";
import { Spacer, Spinner } from "@nextui-org/react";
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