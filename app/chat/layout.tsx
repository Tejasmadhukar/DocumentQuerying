import { authConfig } from "@/config/auth";
import { getServerSession } from "next-auth";

export default async function ChatLayout(props: {
	children: React.ReactNode,
	NotAllowed: React.ReactNode,
}) {
	const session = await getServerSession(authConfig);

	if (!session) {
		return (
			<>
				<div className="pt-16 min-h-screen">
					{props.NotAllowed}
				</div>
			</>
		)
	  }

	return (
        <>
			<div className="pt-16 min-h-screen">
				{props.children}
			</div>
        </>
	);
}
