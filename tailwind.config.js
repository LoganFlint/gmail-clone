module.exports = {
    purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
    darkMode: false,
    theme: {
       fontFamily: {
        source: ["Source Sans Pro", "sans-serif"],
        mono: ['Inconsolata', "monospace"]
    },
      colors: {
        lbBlue: "#1B325A",
        lbLightBlue: "#EBF5FF",
        white: "#fff",
        transparent: "transparent",
        black: "#000",
        unicornSilver: "#e7e7e7",
        gray: "#808080"
      },
      extend: {},
    },
    variants: {
      extend: {},
    },
    plugins: [],
  }