export default function ChatLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
        <>
			<section className="flex  justify-center  h-screen mt-20">
            	{children}
			</section>
        </>
	);
}
