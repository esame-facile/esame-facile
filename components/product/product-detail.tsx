"use client";

import { useEffect } from "react";
import Image from "next/image";
import { FileText, User, Calendar, BookOpen, CreditCard, CheckCircle2, Shield, Eye } from "lucide-react";
import { Button, Badge, PriceDisplay, StarRating } from "@/components/ui";
import { Product } from "@/types";
import { trackViewProduct } from "@/lib/analytics";
import { PreviewCarousel } from "./preview-carousel";

interface ProductDetailProps {
  product: Product;
}

export function ProductDetail({ product }: ProductDetailProps) {
  useEffect(() => {
    trackViewProduct(product.id, product.name, product.price);
  }, [product.id, product.name, product.price]);

  const handleBuy = () => {
    if (product.stripe_payment_link) {
      window.location.href = product.stripe_payment_link;
    }
  };

  const metadata = [
    { icon: BookOpen, label: "Università", value: product.university },
    product.professor && {
      icon: User,
      label: "Professore",
      value: product.professor,
    },
    product.academic_year && {
      icon: Calendar,
      label: "Anno",
      value: product.academic_year,
    },
    product.pages && {
      icon: FileText,
      label: "Pagine",
      value: `${product.pages} pagine`,
    },
  ].filter(Boolean) as { icon: typeof BookOpen; label: string; value: string }[];

  return (
    <div className="space-y-6">
      {/* Link anteprima sopra copertina */}
      <button
        onClick={() => document.getElementById("anteprima-kit")?.scrollIntoView({ behavior: "smooth" })}
        className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-brand bg-primary-50 border border-primary-200 text-primary-600 font-semibold text-body-sm hover:bg-primary-100 active:scale-[0.98] transition-all"
      >
        <Eye size={16} />
        Guarda l&apos;anteprima del kit
      </button>

      {/* Image */}
      <div className="relative aspect-[3/4] bg-neutral-100 rounded-brand overflow-hidden">
        {product.preview_image ? (
          <Image
            src={product.preview_image}
            alt={product.name}
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-neutral-400">
            <FileText size={64} />
          </div>
        )}
        {product.original_price && (
          <div className="absolute top-3 left-3">
            <Badge variant="discount">
              -
              {Math.round(
                ((product.original_price - product.price) /
                  product.original_price) *
                  100
              )}
              %
            </Badge>
          </div>
        )}
      </div>

      {/* Category */}
      {product.category && (
        <Badge>{product.category.name}</Badge>
      )}

      {/* Title */}
      <h1 className="text-display-sm">{product.name}</h1>

      {/* Rating */}
      {product.review_count > 0 && (
        <div className="flex items-center gap-2">
          <StarRating rating={product.average_rating} size={18} />
          <span className="text-body-sm text-neutral-500">
            {product.average_rating.toFixed(1)} ({product.review_count}{" "}
            {product.review_count === 1 ? "recensione" : "recensioni"})
          </span>
        </div>
      )}

      {/* Price */}
      <div>
        <PriceDisplay
          price={product.price}
          originalPrice={product.original_price}
          size="lg"
        />
        <p className="text-caption text-neutral-400 mt-1">
          Meno di un aperitivo. Una volta, per sempre.
        </p>
        {product.original_price && (
          <p className="text-caption text-red-500 font-semibold mt-0.5">
            Prezzo promozionale — potrebbe aumentare presto
          </p>
        )}
      </div>

      {/* Garanzia — subito dopo il prezzo */}
      <div className="p-4 rounded-brand bg-green-50 border border-green-200">
        <div className="flex items-start gap-3">
          <Shield size={20} className="text-green-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-body-sm font-bold text-green-800">Garanzia soddisfatto o rimborsato</p>
            <p className="text-caption text-green-700 mt-1">
              Se entro 7 giorni il kit non ti ha aiutato, scrivici su WhatsApp e ti rimborsiamo.
            </p>
          </div>
        </div>
      </div>

      {/* Metadata */}
      <div className="grid grid-cols-2 gap-3">
        {metadata.map((meta) => (
          <div
            key={meta.label}
            className="flex items-center gap-2 p-3 rounded-brand bg-neutral-50 border border-neutral-200"
          >
            <meta.icon size={16} className="text-primary-400 flex-shrink-0" />
            <div>
              <p className="text-caption text-neutral-400">{meta.label}</p>
              <p className="text-body-sm font-medium text-neutral-800">
                {meta.value}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Description */}
      <div>
        <h2 className="text-body-lg font-bold mb-3">Descrizione</h2>
        <p className="text-body-sm text-neutral-500 leading-relaxed whitespace-pre-line">
          {product.description}
        </p>
      </div>

      {/* Preview Carousel */}
      <div id="anteprima-kit">
        <PreviewCarousel slug={product.slug} previewCount={3} />
      </div>

      {/* What's inside */}
      <div className="p-4 rounded-brand bg-primary-50 border border-primary-100">
        <h2 className="text-body-lg font-bold mb-3">Cosa troverai dentro</h2>
        <ul className="space-y-2">
          {[
            "Schemi e tabelle comparative per ogni argomento",
            "Articoli del Codice Civile evidenziati e spiegati",
            "Top 30 domande d'esame con risposta strutturata",
            "Piano studio 20 giorni con checklist giornaliera",
            "Formato PDF, leggibile su qualsiasi dispositivo",
          ].map((item) => (
            <li key={item} className="flex items-start gap-2">
              <CheckCircle2 size={16} className="text-primary-500 mt-0.5 flex-shrink-0" />
              <span className="text-body-sm text-neutral-700">{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Format badge */}
      <div className="flex items-center gap-2">
        <Badge variant="success">
          {product.format.toUpperCase()}
        </Badge>
        <span className="text-caption text-neutral-400">
          Download immediato dopo il pagamento
        </span>
      </div>

      {/* Spacer for sticky CTA */}
      <div className="h-24" />

      {/* Sticky CTA */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/95 backdrop-blur-md border-t border-neutral-200 z-40 safe-bottom">
        <div className="container-app flex items-center justify-between gap-4">
          <PriceDisplay
            price={product.price}
            originalPrice={product.original_price}
            size="md"
          />
          {product.stripe_payment_link ? (
            <a
              href={product.stripe_payment_link}
              className="flex-1 max-w-[200px] inline-flex items-center justify-center gap-2 bg-primary-600 hover:bg-primary-700 active:scale-[0.98] text-white font-semibold rounded-brand px-6 h-12 text-body-md transition-all"
            >
              <CreditCard size={18} /> Acquista ora
            </a>
          ) : (
            <Button size="lg" disabled className="flex-1 max-w-[200px] !text-white">
              <CreditCard size={18} /> Acquista ora
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
