"use client"
import { UserIcon } from "./icons";
import { Button } from "@nextui-org/button";
import { signOut } from "next-auth/react";

export function LogoutButton () {
    return (
        <Button
            startContent={<UserIcon />}
            onPress={(e)=>signOut()}
            variant="flat"
            color="danger"
        >
            Logout
        </Button>
    )
}