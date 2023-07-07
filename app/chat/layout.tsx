export default function ChatLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
        <>
			<div className=" min-h-screen">
				{children}
			</div>
        </>
	);
}
