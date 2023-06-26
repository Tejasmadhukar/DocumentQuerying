"use client"
import { Button, Link } from "@nextui-org/react"
import { GreenUserIcon } from "../icons"
export default function LogInButton () {
    return (
        <Button
            as={Link}
            href={'/auth'}
            variant="flat"
            color="success"
            startContent={<GreenUserIcon />}
            >
                Login
        </Button>
    )
}