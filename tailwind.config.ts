import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "custom-pink": "#EE2A70",
        "custom-dark": "#881840",
      },
      backgroundImage: {
        "gradient-custom":
          "linear-gradient(259deg, #EE2A70 27.19%, #881840 96.05%)",
      },
    },
  },
  plugins: [],
};
export default config;
