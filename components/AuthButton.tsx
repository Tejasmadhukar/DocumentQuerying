"use client"
import { useSession } from "next-auth/react";
import LogInButton from "./LoginButton";
import { LogoutButton } from "./LogoutButton";

export default function AuthButton () {
    const { data: session } = useSession();
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