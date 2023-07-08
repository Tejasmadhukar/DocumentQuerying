export default function AuthLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
        <div className=" min-h-screen">
		<section className="flex justify-center mt-14 gap-4 py-24 md:py-10">
			<div className="max-w-lg text-center">
				{children}
			</div>
		</section>
		</div>
	);
}
