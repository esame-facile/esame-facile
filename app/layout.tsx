import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { ToastProvider } from "@/components/ui/toast";
import { Analytics } from "@/components/analytics";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#FFFFFF",
};

export const metadata: Metadata = {
  title: {
    default: "Esame Facile — Kit Superamento Esami Universitari",
    template: "%s | Esame Facile",
  },
  description:
    "Kit con schemi, trucchi e strategie per superare i tuoi esami universitari. Creati da chi ce l'ha fatta.",
  keywords: [
    "kit superamento esame",
    "schemi universitari",
    "trucchi esame",
    "esami universitari",
    "metodo studio università",
  ],
  authors: [{ name: "Esame Facile" }],
  openGraph: {
    type: "website",
    locale: "it_IT",
    siteName: "Esame Facile",
    title: "Esame Facile — Kit Superamento Esami Universitari",
    description:
      "Schemi, trucchi e strategie per superare i tuoi esami universitari.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it">
      <body className={`${inter.variable} font-sans`}>
        <ToastProvider>
          {children}
        </ToastProvider>
        <Analytics />
      </body>
    </html>
  );
}
