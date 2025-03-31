const { fontFamily } = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
          light: "hsl(var(--primary-light))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: '65ch',
            color: 'hsl(var(--foreground))',
            a: {
              color: 'hsl(var(--primary))',
              '&:hover': {
                color: 'hsl(var(--primary-light))',
              },
            },
            strong: {
              color: 'hsl(var(--foreground))',
            },
            h1: {
              color: 'hsl(var(--foreground))',
            },
            h2: {
              color: 'hsl(var(--foreground))',
            },
            h3: {
              color: 'hsl(var(--foreground))',
            },
            h4: {
              color: 'hsl(var(--foreground))',
            },
            blockquote: {
              color: 'hsl(var(--muted-foreground))',
              borderLeftColor: 'hsl(var(--border))',
            },
            code: {
              color: 'hsl(var(--foreground))',
              backgroundColor: 'hsl(var(--muted))',
              borderRadius: '0.25rem',
              padding: '0.2em 0.4em',
            },
            pre: {
              backgroundColor: 'hsl(var(--card))',
              code: {
                backgroundColor: 'transparent',
              },
            },
            hr: {
              borderColor: 'hsl(var(--border))',
            },
          },
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    require("@tailwindcss/typography"),
    function ({ addBase, theme }) {
      addBase({
        ":root": {
          "--background": "0 0% 100%",
          "--foreground": "222.2 84% 4.9%",
          "--card": "0 0% 100%",
          "--card-foreground": "222.2 84% 4.9%",
          "--popover": "0 0% 100%",
          "--popover-foreground": "222.2 84% 4.9%",
          "--primary": "221.2 83.2% 53.3%",
          "--primary-light": "210 100% 66%",
          "--primary-foreground": "210 40% 98%",
          "--secondary": "210 40% 96.1%",
          "--secondary-foreground": "222.2 47.4% 11.2%",
          "--muted": "210 40% 96.1%",
          "--muted-foreground": "215.4 16.3% 46.9%",
          "--accent": "210 40% 96.1%",
          "--accent-foreground": "222.2 47.4% 11.2%",
          "--destructive": "0 84.2% 60.2%",
          "--destructive-foreground": "210 40% 98%",
          "--border": "214.3 31.8% 91.4%",
          "--input": "214.3 31.8% 91.4%",
          "--ring": "221.2 83.2% 53.3%",
          "--radius": "0.5rem",
        },
        ".dark": {
          "--background": "222.2 84% 4.9%",
          "--foreground": "210 40% 98%",
          "--card": "222.2 84% 4.9%",
          "--card-foreground": "210 40% 98%",
          "--popover": "222.2 84% 4.9%",
          "--popover-foreground": "210 40% 98%",
          "--primary": "217.2 91.2% 59.8%",
          "--primary-light": "212.7 93.7% 67.8%",
          "--primary-foreground": "222.2 47.4% 11.2%",
          "--secondary": "217.2 32.6% 17.5%",
          "--secondary-foreground": "210 40% 98%",
          "--muted": "217.2 32.6% 17.5%",
          "--muted-foreground": "215 20.2% 65.1%",
          "--accent": "217.2 32.6% 17.5%",
          "--accent-foreground": "210 40% 98%",
          "--destructive": "0 62.8% 30.6%",
          "--destructive-foreground": "210 40% 98%",
          "--border": "217.2 32.6% 17.5%",
          "--input": "217.2 32.6% 17.5%",
          "--ring": "224.3 76.5% 48%",
        },
      });
    },
  ],
};
