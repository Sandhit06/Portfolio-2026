import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  authors: [{ name: "Sandhit Karmakar", url: "https://github.com/Sandhit06" }],
  creator: "Sandhit Karmakar",
  twitter: {
    card: "summary",
    title: "Sandhit Karmakar | Software Engineer & Full Stack Developer",
    description: "Sandhit Karmakar is a software engineer at Standard Chartered and a VIT Chennai Computer Science (AI & ML) graduate. Explore his full-stack, backend and AI projects using React, Next.js, Java, Spring Boot and Python.",
  },
  title: "Sandhit Karmakar | Software Engineer & Full Stack Developer",
  description: "Sandhit Karmakar is a software engineer at Standard Chartered and a VIT Chennai Computer Science (AI & ML) graduate. Explore his full-stack, backend and AI projects using React, Next.js, Java, Spring Boot and Python.",
  openGraph: {
    title: "Sandhit Karmakar | Software Engineer & Full Stack Developer",
    description: "Sandhit Karmakar is a software engineer at Standard Chartered and a VIT Chennai Computer Science (AI & ML) graduate. Explore his full-stack, backend and AI projects using React, Next.js, Java, Spring Boot and Python.",
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
