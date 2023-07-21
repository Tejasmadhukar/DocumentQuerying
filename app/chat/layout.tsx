import { authConfig } from "@/config/auth";
import { getServerSession } from "next-auth";
import NotAllowedChat from "@/components/Chat/NotAllowedChat";
import Sidebar from "@/components/Chat/Sidebar";
import { GoodDivider,GoodSpinner } from "@/components/NextuiClient";
import { Suspense } from "react";
import { prisma } from "@/config/db";
import Link from "next/link";

async function Titles ({ UserID }: { UserID: string }){

    const titles = await await prisma.messageGroup.findMany({
        where:{
            userId: UserID,
        }
    })

    return (
        <>
            <div className="flex flex-col mt-2">
                {titles.map((title, index) => 
                    <Link key={index} className="text-purple-500 mt-4" href={`/chat/${title.id}`}>{title.Title}</Link>
                )}
            </div>
        </>
    )
}

export default async function ChatLayout(props: {
	children: React.ReactNode,
}) {
	const session = await getServerSession(authConfig);

	if (!session) {
		return (
			<>
				<div className="pt-16 min-h-screen">
					<NotAllowedChat />
				</div>
			</>
		)
	  }

	return (
        <>
			<div className="pt-16 min-h-screen flex">
				<div className="w-1/6 flex flex-col items-center">
					<Sidebar session={session}/>
					<Suspense fallback={<p>Loading...</p>}>
						<Titles UserID={session.user.id}/>
					</Suspense>
				</div>
				<GoodDivider />
				{props.children}
			</div>
        </>
	);
}
