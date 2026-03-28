import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Catalogo",
  description:
    "Sfoglia tutti i Kit Superamento Esame. Schemi, trucchi e strategie per ogni materia universitaria.",
};

export default function CatalogoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
