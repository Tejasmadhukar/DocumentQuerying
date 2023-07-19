import NotAllowedChat from "@/components/Chat/NotAllowedChat";
import { authConfig } from "@/config/auth";
import { getServerSession } from "next-auth";

export default async function ChatLayout({children,} : {children: React.ReactNode}) {
	const session = await getServerSession(authConfig);

	if (!session) {
		return (
			<div className="pt-16 min-h-screen">
				<NotAllowedChat />
			</div>
		)
	  }

	return (
        <>
			<div className="pt-16 min-h-screen">
				{children}
			</div>
        </>
	);
}
