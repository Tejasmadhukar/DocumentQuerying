export default function ChatLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className="gap-4 py-2 md:py-10">
			{children}
		</div>
	);
}
