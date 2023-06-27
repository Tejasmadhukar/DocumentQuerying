export type SiteConfig = typeof siteConfig;

export const siteConfig = {
	name: "GPT for you",
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
	],
	links: {
		github: "https://github.com/Tejasmadhukar/Pinecone-Frontend",
    	auth: "/auth",
		demo: "/chat"
	},
};
