import { Button } from "@nextui-org/button";
import Link from "next/link";
import { Suspense } from "react";
import { prisma } from "@/config/db";
// import { PlusIcon } from "../icons"; Reduce size of this icon so it looks nice 


export default async function Sidebar() {
    return (
        <>
            <div className="w-1/6 flex flex-col items-center">
                <Button className=" mt-4" as={Link} href="/chat" color="secondary" variant="ghost">New Chat</Button>
            </div>
            
        </>
    )
}