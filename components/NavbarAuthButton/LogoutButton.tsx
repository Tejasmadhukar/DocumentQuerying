"use client"
import { Button } from "@nextui-org/button";
import { signOut } from "next-auth/react";
import { RedUserIcon } from "../icons";

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