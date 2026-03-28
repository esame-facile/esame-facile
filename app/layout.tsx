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
    default: "Esame Facile — Appunti Universitari Verificati",
    template: "%s | Esame Facile",
  },
  description:
    "Appunti e riassunti universitari verificati per superare i tuoi esami. Studia meglio, studia meno.",
  keywords: [
    "appunti universitari",
    "riassunti università",
    "materiale studio",
    "esami universitari",
    "appunti PDF",
  ],
  authors: [{ name: "Esame Facile" }],
  openGraph: {
    type: "website",
    locale: "it_IT",
    siteName: "Esame Facile",
    title: "Esame Facile — Appunti Universitari Verificati",
    description:
      "Appunti e riassunti universitari verificati per superare i tuoi esami.",
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
