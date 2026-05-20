import type { Metadata } from "next";
import { SwRegister } from "@/components/affiliati/sw-register";

export const metadata: Metadata = {
  title: "Esame Facile — Affiliati",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "EF Affiliati",
  },
  other: {
    "apple-touch-icon": "/icon-192.png",
    "mobile-web-app-capable": "yes",
  },
};

export default function AffiliatiLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SwRegister />
      {children}
    </>
  );
}
