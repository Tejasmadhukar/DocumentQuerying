import NextLink from "next/link";
import { Link } from "@nextui-org/link";
import { button as buttonStyles } from "@nextui-org/theme";
import { siteConfig } from "@/config/site";
import { title, subtitle } from "@/components/primitives";

export default function Home() {
	return (
		<section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10 justify-items-center">
			<div className="inline-block max-w-lg text-center justify-center">

				<h1 className={title()}>Make&nbsp;</h1>
				<h1 className={title({ color: "violet" })}>Documents&nbsp;</h1>
				<br />
				<h1 className={title()}>
					More fun with Chat GPT.
				</h1>
				<h2 className={subtitle({ class: "mt-4" })}>
					Fast, modern and reliable Document querying tool.
				</h2>
			</div>

			<div className="flex gap-3">
				<Link
					as={NextLink}
					href={siteConfig.links.demo}
					className={buttonStyles({ color: "primary", radius: "full", variant: "ghost" })}
				>
					Continue
				</Link>
	
			</div>
		</section>
	);
}
