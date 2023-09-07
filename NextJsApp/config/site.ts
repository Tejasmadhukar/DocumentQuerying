export type SiteConfig = typeof siteConfig;

export const siteConfig = {
	name: "GPT for you",
	description: "GPT made to think specifically for you.",
	navItems: [
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
	],
	links: {
		github: "https://github.com/Tejasmadhukar/Pinecone-Frontend",
    	auth: "/auth",
		demo: "/chat"
	},
};

let backendUrl = "http://localhost:80";

if (process.env.NODE_ENV === "production") {
  backendUrl = "http://146.190.9.149";
}

export { backendUrl };
