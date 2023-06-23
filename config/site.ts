export type SiteConfig = typeof siteConfig;

export const siteConfig = {
	name: "Next.js + NextUI",
	description: "Make beautiful websites regardless of your design experience.",
	navItems: [
		{
			label: "How To",
			href: "/about",
		},
		{
			label: "Chat",
			href: "/chat",
		}
	],
	navMenuItems: [
		{
			label: "Chat",
			href: "/chat",
		},
		{
			label: "How To",
			href: "/about",
		},
		{
			label: "Logout",
			href: "/logout",
		},
	],
	links: {
		github: "https://github.com/nextui-org/nextui",
		docs: "https://nextui-docs-v2.vercel.app",
    	auth: "/chat"
	},
};
