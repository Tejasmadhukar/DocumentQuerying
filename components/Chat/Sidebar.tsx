import { Button } from "@nextui-org/button";
import { Session } from "next-auth";
import Link from "next/link";
import { FC } from "react";
// import { PlusIcon } from "../icons"; Reduce size of this icon so it looks nice 

interface SidebarProps {
    session: Session,
}



const Sidebar:FC<SidebarProps> = ({session}) => {
    const id = session.user.id;

    return (
        <>
            
            <Button className=" mt-4" as={Link} href="/chat" color="secondary" variant="ghost">New Chat</Button>
              
            
        </>
    )
}


export default Sidebar;