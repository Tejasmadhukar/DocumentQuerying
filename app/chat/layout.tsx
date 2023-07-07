export default function ChatLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
        <>
			<div className="pt-16 min-h-screen">
				{children}
			</div>
        </>
	);
}
