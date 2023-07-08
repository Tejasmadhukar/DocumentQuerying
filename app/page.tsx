import { subtitle, title } from "@/components/primitives";
import { siteConfig } from "@/config/site";
import { Link } from "@nextui-org/link";
import { button as buttonStyles } from "@nextui-org/theme";
import NextLink from "next/link";

export default function Home() {
	return (
		<div className="min-h-screen bg-gradient-to-b from-sky-200 dark:from-blue-800">
			<section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10 justify-items-center">
					<div className="max-w-lg text-center justify-center gap-4 mt-36">
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
		</div>
	);
}
