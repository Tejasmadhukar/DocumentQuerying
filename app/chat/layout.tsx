import { authConfig } from "@/config/auth";
import { getServerSession } from "next-auth";
import NotAllowedChat from "@/components/Chat/NotAllowedChat";

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
			<div className="pt-16 min-h-screen">
				<h1>sidebar</h1>
				{props.children}
			</div>
        </>
	);
}
