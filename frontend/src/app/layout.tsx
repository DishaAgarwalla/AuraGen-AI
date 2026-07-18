import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AuraGen",
  description:
    "AuraGen - AI Powered Self-Healing User Interface using Cognitive Load Detection and Generative AI.",
  keywords: [
    "AuraGen",
    "AI",
    "Generative UI",
    "LangChain",
    "Groq",
    "React",
    "Next.js",
    "Cognitive Load",
  ],
  authors: [
    {
      name: "Disha Agarwalla",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <body className="min-h-screen bg-slate-100 text-slate-900 antialiased">
        {children}
      </body>
    </html>
  );
}