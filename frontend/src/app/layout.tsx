import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "AuraGen - AI Powered Self-Healing UI",
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
  openGraph: {
    title: "AuraGen - AI Powered Self-Healing UI",
    description: "Intelligent forms that adapt to your cognitive load",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable}`}
    >
      <body className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50 text-slate-900 antialiased flex flex-col items-center">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {children}
        </div>
      </body>
    </html>
  );
}