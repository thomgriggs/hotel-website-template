/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			// Your custom theme extensions can go here
		},
	},
	plugins: [],
	corePlugins: {
		// Disable Tailwind's base styles to use your custom CSS
		preflight: false,
	},
}
