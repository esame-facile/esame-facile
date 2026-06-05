import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { WhatsAppButton } from "@/components/layout/whatsapp-button";
import { LandingTracker } from "@/components/analytics/landing-tracker";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <LandingTracker />
      <Navbar />
      <main className="min-h-screen pt-14">{children}</main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
