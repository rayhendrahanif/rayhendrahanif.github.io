import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";

const newsreader = localFont({
  src: [
    { path: "./fonts/newsreader.woff2", weight: "500", style: "normal" },
    { path: "./fonts/newsreader-italic.woff2", weight: "400", style: "italic" },
  ],
  variable: "--font-newsreader",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://rayhendrahanif.github.io"),
  icons: { icon: "/images/favicon.svg", apple: "/images/profile-400.jpg" },
  authors: [{ name: "Rayhendra Hanif" }],
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fdfbf7" },
    { media: "(prefers-color-scheme: dark)", color: "#111716" },
  ],
};

// Runs before first paint: picks the theme (saved choice, else OS setting) and the page language.
const bootScript = `(function(){var d=document.documentElement;try{var t=localStorage.getItem('theme');if(t!=='light'&&t!=='dark'){t=matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'}d.dataset.theme=t}catch(e){}if(location.pathname.indexOf('/id/')===0||location.pathname==='/id'){d.lang='id'}})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={newsreader.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
