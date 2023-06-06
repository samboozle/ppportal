import plugin from "tailwindcss/plugin";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,svelte,ts}"],
  theme: {
    fontFamily: {
      mono: ["CaskaydiaCove"]
    },
    extend: {
      textShadow: {
        sm: "0 1px 2px var(--tw-shadow-color)",
        DEFAULT: "0 2px 4px var(--tw-shadow-color)",
        lg: "0 8px 16px var(--tw-shadow-color)"
      }
    }
  },
  plugins: [
    require("daisyui"),
    plugin(({ matchUtilities, theme }) => {
      matchUtilities(
        {
          "text-shadow": (textShadow) => ({
            textShadow
          })
        },
        {
          values: theme("textShadow")
        }
      );
    })
  ],
  daisyui: {
    styled: true,
    themes: ["valentine", "retro"],
    base: true,
    utils: true,
    logs: true,
    rtl: false,
    prefix: "",
    darkTheme: "retro"
  },
  darkMode: "media"
};
