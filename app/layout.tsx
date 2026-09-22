import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sandhit Karmakar — Software Engineer",
  description:
    "Software engineer building thoughtful interfaces, reliable backend systems, and AI-powered products. Explore Sandhit Karmakar’s projects and experience.",
  openGraph: {
    title: "Sandhit Karmakar — Software Engineer",
    description:
      "Thoughtful interfaces. Reliable systems. Useful AI. Selected work by Sandhit Karmakar.",
    type: "website",
    locale: "en_US",
  },
  icons: {
    icon: [
      { url: "/favicon-memoji-32.png", type: "image/png", sizes: "32x32" },
      { url: "/favicon-memoji-192.png", type: "image/png", sizes: "192x192" },
    ],
    shortcut: "/favicon-memoji.ico",
    apple: {
      url: "/apple-touch-icon.png",
      sizes: "180x180",
      type: "image/png",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
