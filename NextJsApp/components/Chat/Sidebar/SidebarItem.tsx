import { MessageGroup } from "@prisma/client"

interface SidebarItemProps{
    title : MessageGroup
}

export default function SidebarItem (props: SidebarItemProps) {
    return (
        <>
            <div className=" mt-6 ">
                <p>hi</p>
            </div>
        </>
    )
}