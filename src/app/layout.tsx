import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import SmoothScrollProvider from "@/components/providers/smooth-scroll-provider";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  axes: ["opsz", "SOFT"],
  style: ["normal", "italic"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
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
  icons: {
    icon: "/icon.svg",
  },
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
