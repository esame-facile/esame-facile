import type { Metadata } from "next";
import { SwRegister } from "@/components/admin/sw-register";

export const metadata: Metadata = {
  title: "Esame Facile — Quartier Generale",
  manifest: "/admin-manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "EF Quartiere",
  },
  other: {
    "apple-touch-icon": "/icon-192.png",
    "mobile-web-app-capable": "yes",
  },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SwRegister />
      {children}
    </>
  );
}
