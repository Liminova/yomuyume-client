/** @type {import('tailwindcss').Config} */
export default {
	darkMode: "class",
	content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
	theme: {
		extend: {
			animation: {
				'random-translate': 'random-translate 10s infinite',
			},
			keyframes: {
				'random-translate': {
					'0%, 100%': { transform: 'translateX(0) scale(1.2)' },
					'25%': { transform: 'translateX(10%) translateY(10%) scale(1.5)' },
					'50%': { transform: 'translateX(-10%) translateY(-10%) scale(1.5)' },
					'75%': { transform: 'translateX(10%) translateY(-10%) scale(1.5)' },
				},
			},
		},
	},
	plugins: [],
};
