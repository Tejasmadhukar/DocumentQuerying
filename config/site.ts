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
		github: "https://github.com/Tejasmadhukar/Pinecone-Frontend",
    	auth: "/auth",
		demo: "/chat"
	},
};
