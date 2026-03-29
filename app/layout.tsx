import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import { BUSINESS_NAME, TAGLINE } from "@/lib/constants";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: `${BUSINESS_NAME} | ${TAGLINE}`,
  description:
    "Professional stone, brick, and cinderblock construction in Bannock County, Idaho. Chimney repair, stone fireplaces, outdoor grills, and natural stone additions.",
  openGraph: {
    title: BUSINESS_NAME,
    description: "Idaho's Trusted Stonemasons",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const adsenseId = process.env.NEXT_PUBLIC_ADSENSE_ID;

  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <head>
        {adsenseId && (
          <script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseId}`}
            crossOrigin="anonymous"
          />
        )}
      </head>
      <body className="flex flex-col min-h-screen">{children}</body>
    </html>
  );
}
