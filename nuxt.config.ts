// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	devtools: { enabled: true },
	ssr: false,
	app: {
		head: {
			title: "Yomuyume",
			meta: [
				{ charset: "utf-8" },
				{ name: "viewport", content: "width=device-width, initial-scale=1" },
				{ hid: "description", name: "description", content: "" },
				{ name: "format-detection", content: "telephone=no" },
				{ name: "msapplication-TileColor", content: "#da532c" },
				{ name: "theme-color", content: "#a30056" },
				{ name: "mobile-web-app-capable", content: "yes" },
				{ name: "apple-mobile-web-app-capable", content: "yes" },
				{ name: "apple-mobile-web-app-status-bar-style", content: "default" },
			],
			link: [
				{
					rel: "icon",
					type: "image/png",
					sizes: "32x32",
					href: "/favicon/favicon-32x32.png",
				},
				{
					rel: "icon",
					type: "image/png",
					sizes: "16x16",
					href: "/favicon/favicon-16x16.png",
				},
				{
					rel: "apple-touch-icon",
					sizes: "180x180",
					href: "/favicon/apple-touch-icon.png",
				},
				{ rel: "mask-icon", href: "/favicon/safari-pinned-tab.svg", color: "#5bbad5" },
				{ rel: "manifest", href: "/favicon/manifest.json" },
				{
					rel: "stylesheet",
					href: "https://cdn.jsdelivr.net/gh/unilec/fa-pro/css/all.min.css",
				},
			],
		},
		baseURL: process.env.BASE_URL ?? "/",
	},
	vue: {
		compilerOptions: {
			isCustomElement: (tag: string) => {
				const customElements = ["md-", "swiper-"];

				return customElements.some((customElement) => tag.startsWith(customElement));
			},
		},
	},
	postcss: {
		plugins: {
			tailwindcss: {},
			autoprefixer: {},
		},
	},
	css: ["~/assets/css/m3/theme.css", "~/assets/scss/index.scss"],
	modules: ["@nuxtjs/tailwindcss", "@nuxtjs/eslint-module", "@pinia/nuxt"],
	eslint: {
		lintOnStart: false,
	},
	experimental: {
		viewTransition: true,
	},
});
