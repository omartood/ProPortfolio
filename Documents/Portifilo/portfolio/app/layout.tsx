import type { Metadata } from "next";
import { Inter, Roboto_Mono } from "next/font/google";
import "./globals.css";
import ScrollProgress from "./components/ui/ScrollProgress";
import ThemeSwitcher from "./components/ui/ThemeSwitcher";
import { Toaster } from "react-hot-toast";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const robotoMono = Roboto_Mono({
  variable: "--font-roboto-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Portfolio | Modern Developer",
  description:
    "A modern, responsive portfolio showcasing development skills and projects.",
  keywords:
    "web development, portfolio, javascript, react, next.js, frontend, developer",
  creator: "Modern Developer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} ${robotoMono.variable} antialiased`}>
        <ScrollProgress />
        <ThemeSwitcher />
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: "var(--background)",
              color: "var(--foreground)",
              border: "1px solid var(--border)",
            },
            success: {
              iconTheme: {
                primary: "var(--primary)",
                secondary: "white",
              },
            },
            error: {
              iconTheme: {
                primary: "#ff5555",
                secondary: "white",
              },
            },
          }}
        />
        {children}
      </body>
    </html>
  );
}
