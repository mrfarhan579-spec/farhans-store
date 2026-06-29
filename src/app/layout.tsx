import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "FARHAN'S STORE | Luxury E-Commerce",
  description: "Discover the world's most exclusive watches, suits, and perfumes. FARHAN'S STORE — Where luxury meets perfection.",
  keywords: "luxury watches, designer suits, premium perfumes, luxury fashion, Farhan Store",
  openGraph: {
    title: "FARHAN'S STORE | Luxury E-Commerce",
    description: "Where luxury meets perfection.",
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
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
