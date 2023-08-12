import getQueryClient from "@/app/getQueryClient";
import { prisma } from "@/config/db";
import { Button } from "@nextui-org/button";
import { Hydrate, dehydrate } from "@tanstack/react-query";
import { Session } from "next-auth";
import Link from "next/link";
import { FC } from "react";
import SidebarItems from "./SidebarItems";
// import { PlusIcon } from "../icons"; Reduce size of this icon so it looks nice 

interface SidebarProps {
    session: Session,
}

async function getTitles (UserID : string){
    const titles = await prisma.messageGroup.findMany({
        where:{
            userId: UserID,
        }
    })

    return titles
}


const Sidebar:FC<SidebarProps> = async ({session}) => {

    const userId = session.user.id;

    const queryClient = getQueryClient()
    await queryClient.prefetchQuery(['title'], () => getTitles(userId))

    const dehydratedState = dehydrate(queryClient)

    return (
        <>
            <div className="w-1/6 flex flex-col items-center">
                <Button className="mt-4" as={Link} href="/chat" color="secondary" variant="ghost">New Chat</Button>
                <Hydrate state={dehydratedState}>
                    <SidebarItems />
                </Hydrate>
            </div>
        </>
    )
}


export default Sidebar;