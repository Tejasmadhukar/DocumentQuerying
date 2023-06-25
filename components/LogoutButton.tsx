"use client"
import { RedUserIcon } from "./icons";
import { Button } from "@nextui-org/button";
import { signOut } from "next-auth/react";

export function LogoutButton () {
    return (
        <Button
            startContent={<RedUserIcon />}
            onPress={(e)=>signOut()}
            variant="flat"
            color="danger"
        >
            Logout
        </Button>
    )
}