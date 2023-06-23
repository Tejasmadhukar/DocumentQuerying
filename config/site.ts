export type SiteConfig = typeof siteConfig;

export const siteConfig = {
	name: "Personalised GPT",
	description: "GPT made to think specifically for you.",
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
