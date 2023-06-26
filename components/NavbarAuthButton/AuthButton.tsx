"use client"
import { useSession } from "next-auth/react";
import LogInButton from "./LoginButton";
import { LogoutButton } from "./LogoutButton";

export default function AuthButton () {
    const session = useSession();
    console.log(session);
    return (
        <>
        {!session ? (
            <LogInButton />
        ) : (
            <LogoutButton />
        )}
        </>
    )
}