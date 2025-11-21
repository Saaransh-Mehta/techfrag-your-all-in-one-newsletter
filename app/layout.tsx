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
  title: "TechFrag - Your Tech Newsletter",
  description: "Stay informed with the latest in technology, innovation, and digital transformation. Subscribe to TechFrag for curated tech news delivered to your inbox.",
  keywords: ["technology", "newsletter", "tech news", "innovation", "AI", "cybersecurity", "space tech"],
  authors: [{ name: "TechFrag Team" }],
  openGraph: {
    title: "TechFrag - Your Tech Newsletter",
    description: "Stay informed with the latest in technology, innovation, and digital transformation.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
