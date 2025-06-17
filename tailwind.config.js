export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'neon-green': '#00ff41',
        'neon-pink': '#ff00ff',
      },
      fontFamily: {
        'tech-mono': ['"Share Tech Mono"', 'monospace'],
      },
    },
  },
  plugins: [],
}