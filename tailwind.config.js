/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	darkMode: 'class',
	theme: {
		extend: {
			fontFamily: {
				eczar: ['Eczar', 'sans-serif'],
				amarante: ['Amarante', 'sans-serif'],
				paytone: ['Paytone One', 'sans-serif']
			}
		}
	},
	plugins: []
};
