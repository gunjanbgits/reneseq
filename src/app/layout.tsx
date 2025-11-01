import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/snippets/header";

const departureMono = localFont({
  src: "../../src/fonts/DepartureMono-Regular.woff2",
  variable: "--font-departure-mono",
  weight: "400",
  style: "normal",
});


export const metadata: Metadata = {
  title: "René Quant — A Visual Quantizer for René 2",
  description:
    "René Quant is an independent web utility by Gunjan Bhutani for exploring scales, chords, and quantization patterns for Cartesian sequencers like Make Noise René 2. Generate, visualize, and print compositional grids from digital to physical.",
  keywords: [
    "René Quant",
    "René 2",
    "Make Noise",
    "modular synth",
    "Eurorack",
    "quantizer",
    "generative music",
    "computational design",
    "Gunjan Bhutani",
    "creative coding",
    "sequencer",
    "Cartesian sequencer",
  ],
  authors: [{ name: "GunjanB", url: "https://gunjanb.space" }],
  creator: "GunjanB",
  publisher: "GunjanB",
  openGraph: {
    title: "René Quant — A Visual Quantizer for René 2",
    description:
      "Explore scales, chords, and grid mappings for Cartesian sequencers. Visualize and print quantization layouts — from digital to physical.",
    url: "https://renequant.vercel.app/", // replace with your deployed URL
    siteName: "René Quant",
    images: [
      {
        url: "/og-image.png", // replace with your preview image path
        width: 1200,
        height: 630,
        alt: "René Quant - Quantization Pattern Generator for René 2",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "René Quant — A Visual Quantizer for René 2",
    description:
      "A creative coding tool by Gunjan Bhutani for mapping scales and chords to René 2 grids.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://renequant.vercel.app/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark bg-neutral-900">
      <body
        className={` ${departureMono.variable} antialiased font-mono dark bg-neutral-900`}
      >
        <Header />
        {children}
      </body>
    </html>
  );
}
