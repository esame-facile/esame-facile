import Link from "next/link";
import { BookOpen } from "lucide-react";
import { Button } from "@/components/ui";

export default function CheckoutPage() {
  return (
    <div className="container-app py-16 text-center">
      <BookOpen size={48} className="mx-auto text-neutral-400 mb-4" />
      <h1 className="text-display-sm mb-3">Acquista dal catalogo</h1>
      <p className="text-body-md text-neutral-500 mb-8 max-w-sm mx-auto">
        Scegli un ebook dal catalogo e clicca &quot;Acquista ora&quot; per procedere al pagamento.
      </p>
      <Link href="/catalogo">
        <Button size="lg" className="w-full">Vai al catalogo</Button>
      </Link>
    </div>
  );
}
