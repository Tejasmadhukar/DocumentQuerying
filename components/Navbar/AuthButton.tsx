"use client"
import { useSession } from "next-auth/react";
import LogInButton from "./LoginButton";
import { LogoutButton } from "./LogoutButton";
import { Spinner } from "@nextui-org/react";

export default function AuthButton () {
    const session = useSession();
    return (
        <>
        {session.status=="unauthenticated" ? (
            <LogInButton />
        ) : session.status=="authenticated" ?  (
            <LogoutButton />
        ) : (
            <Spinner />
        )}
        </>
    )
}