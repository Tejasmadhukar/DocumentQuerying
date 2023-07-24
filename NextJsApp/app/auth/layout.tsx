export default function AuthLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className="pt-16 min-h-screen">
			{children}
		</div>
	);
}
