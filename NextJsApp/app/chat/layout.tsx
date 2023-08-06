import NotAllowedChat from "@/components/Chat/NotAllowedChat";
import Sidebar from "@/components/Chat/Sidebar/Sidebar";
import { GoodDivider } from "@/components/NextuiClient";
import { authConfig } from "@/config/auth";
import { getServerSession } from "next-auth";

export default async function ChatLayout(props: {
	children: React.ReactNode,
}) {
	const session = await getServerSession(authConfig);

	if (!session) {
		return (
			<div className="pt-16 min-h-screen">
				<NotAllowedChat />
			</div>
		)
	  }

	return (
		<div className="pt-16 min-h-screen flex">
			<Sidebar session={session}/>
			<GoodDivider />
			{props.children}
		</div>
	);
}
