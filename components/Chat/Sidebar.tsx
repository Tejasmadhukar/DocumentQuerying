import { prisma } from "@/config/db";
import { Button } from "@nextui-org/button";
import { Session } from "next-auth";
import Link from "next/link";
import { Spinner } from "@nextui-org/react";
import { FC, Suspense } from "react";
// import { PlusIcon } from "../icons"; Reduce size of this icon so it looks nice 

interface SidebarProps {
    session: Session,
}

async function Titles ({ email }: { email: string }){

    const user = await prisma.user.findUnique({
        where:{
            email: email
        }
    })

    const titles = await prisma.messageGroup.findMany({
        where:{
            userID: user?.userID
        }
    })

    console.log(titles)

    return (
        <>
            {titles.map((title) => (
                <>
                    <h1>{title.Title}</h1>
                </>
            ))}
        </>
    )
}

const Sidebar:FC<SidebarProps> = ({session}) => {
    const email = session.user?.email;

    if(!email) return <p>Get out</p>


    return (
        <>
            <div className="w-1/6 flex flex-col items-center">
                <Button className=" mt-4" as={Link} href="/chat" color="secondary" variant="ghost">New Chat</Button>
                {/* <Suspense fallback={<div>Loading...</div>}>
                    <Titles email={email}/>
                </Suspense> */}
            </div>
            
        </>
    )
}


export default Sidebar;