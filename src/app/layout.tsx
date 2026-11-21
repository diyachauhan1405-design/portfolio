import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import SmoothScrollProvider from "@/components/providers/smooth-scroll-provider";

// Fonts are self-hosted (from Fontsource, SIL OFL — see ./fonts/*-OFL.txt) so the
// build never has to download from Google Fonts. Fetching them at build time broke
// the GitHub Actions deploy.
const fraunces = localFont({
  variable: "--font-fraunces",
  src: [
    { path: "./fonts/fraunces-latin-full-normal.woff2", weight: "100 900", style: "normal" },
    { path: "./fonts/fraunces-latin-full-italic.woff2", weight: "100 900", style: "italic" },
  ],
  display: "swap",
});

const inter = localFont({
  variable: "--font-inter",
  src: "./fonts/inter-latin-wght-normal.woff2",
  weight: "100 900",
  display: "swap",
});

export const metadata: Metadata = {
  // Favicon set lives in /public. Paths are prefixed with the GitHub Pages base path,
  // which Next does not add to metadata URLs on its own.
  icons: {
    icon: [
      { url: `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/icon.svg?v=d`, type: "image/svg+xml" },
      { url: `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/favicon.ico?v=d`, sizes: "48x48" },
    ],
    apple: { url: `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/apple-icon.png?v=d`, sizes: "180x180" },
  },
  title: "Diya Chauhan — UI/UX Designer & Frontend Developer",
  description:
    "Diya Chauhan designs interfaces and builds them in code — UI/UX Designer & Frontend Developer focused on AI products. Immediate joiner, Ahmedabad.",
  keywords: [
    "Diya Chauhan",
    "UI/UX Designer",
    "Frontend Developer",
    "Product Designer",
    "React Developer",
    "Portfolio",
  ],
  openGraph: {
    title: "Diya Chauhan — UI/UX Designer & Frontend Developer",
    description:
      "I design interfaces, then I build them in code. UI/UX Designer & Frontend Developer focused on AI products.",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${inter.variable} h-full scroll-smooth antialiased`}
    >
      <body className="min-h-full flex flex-col bg-bg text-text-primary font-body ">
        <SmoothScrollProvider>
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
