/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter", "sans-serif"],
      },
      fontSize: {
        xl: "48px", // Extra-large font for titles like "Typo Hunt"
        lg: "24px", // Large font for headings
        "sub-lg": "20px", // Large font for subheadings
        md: "16px", // Medium font for buttons or primary UI text
        sm: "14px", // Small font for subheaders
        xs: "12px", // Extra small font for secondary information
      },
      letterSpacing: {
        "text-wide": "150%", // Wide letter-spacing for headings
      },
      colors: {
        primary: "#5B5B5B", // Black for main headings
        secondary: "#979797", // Gray for subheadings and supporting text
        muted: "#9CA3AF", // Muted gray for lower-priority text
        "gray-bg": "#ECECEC",
        "primary-red": "#D37777",
        "border-gray": "#B7B7B7",
        faded: "#D2D2D2",
      },
      boxShadow: {
        "shadow-button":
          "0px 2px 4px rgba(0, 0, 0, 0.12), 0px 0px 2px rgba(0, 0, 0, 0.25)",
        "shadow-mini":
          "0px 1px 4px rgba(0, 0, 0, 0.12), 0px 0px 2px rgba(0, 0, 0, 0.25)",
        "shadow-xs-mini":
          "0px 1px 2px rgba(0, 0, 0, 0.25)",
        "shadow-hover":
          "0px 2px 6px rgba(0, 0, 0, 0.20), 0px 0px 2px rgba(0, 0, 0, 0.22)",
      },
    },
  },
  plugins: [],
};
