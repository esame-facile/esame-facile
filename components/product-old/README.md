# Product Detail Components (Old Site)

Backup della struttura di visualizzazione prodotto dal vecchio sito UniPass.

## Componenti inclusi

### 1. **product-detail.tsx** (Main component)
Pagina principale di visualizzazione prodotto con:
- **Anteprima visibile** (`<PreviewCarousel />`) - Carousel di immagini sample con blur su ultima pagina
- **Immagine copertina** - Preview image 3:4 aspect ratio
- **Categoria, titolo, rating, prezzo** - Metadata prodotto
- **Sezione "Cosa troverai dentro"** - Feature list customizzata per ogni prodotto (basata su `PRODUCT_FEATURES` object)
- **Descrizione** - Long-form text
- **Sticky CTA "Acquista ora"** - Fixed bottom button con Stripe payment link
- **Garanzia badge** - "Acquisto protetto via Stripe"

**Key features:**
```tsx
// Features customizzate per slug
const PRODUCT_FEATURES: Record<string, string[]> = {
  "analisi-1": [...],
  "statistica": [...],
  // etc
}

// Se slug non trovato, usa default
const features = PRODUCT_FEATURES[product.slug] ?? DEFAULT_FEATURES;
```

**Analytics tracking:**
```tsx
trackViewProduct(product.id, product.name, product.price);
```

### 2. **product-reviews.tsx**
Sezione recensioni con:
- Titolo "Recensioni (X)"
- Grid di review cards con:
  - Nome reviewer (`display_name`)
  - Star rating
  - Commento
  - Data formattata

### 3. **preview-carousel.tsx**
Carousel interattivo per anteprima pagine:
- **Naming convention**: `/images/products/previews/{slug}/preview-{n}.jpg` (1, 2, 3...)
- **Navigation**: Arrow buttons left/right + dots pagination
- **Blur overlay**: Ultima pagina ha blur + lock icon + CTA "25+ schemi nel kit completo"
- **Error handling**: Se immagine non carica, la salta
- **Aspetto**: 3:4 ratio, responsive

### 4. **product-detail-client.tsx**
Client wrapper che compone i tre componenti:
```tsx
<ProductDetailClient product={product} reviews={reviews} />
  ├─ <ProductDetail />
  ├─ <ProductReviews />
  └─ <RelatedProducts />
```

### 5. **page-product-detail.tsx**
Server component per route `app/(main)/catalogo/[slug]/page.tsx`:
- Carica prodotto da Supabase
- Carica reviews (solo approved)
- Genera JSON-LD schema
- Genera metadata (SEO)

## Come integrarla nel nuovo sito

### 1. Struttura di file
```
components/
├── product/               (new site components)
└── product-old/          (this backup)
    ├── product-detail.tsx
    ├── product-reviews.tsx
    ├── preview-carousel.tsx
    ├── product-detail-client.tsx
    └── page-product-detail.tsx
```

### 2. Database schema richiesta
```sql
-- Nella tabella products
ALTER TABLE products ADD COLUMN IF NOT EXISTS 
  stripe_payment_link TEXT;

-- Nella tabella reviews
ALTER TABLE reviews ADD COLUMN IF NOT EXISTS 
  display_name TEXT,
  is_approved BOOLEAN DEFAULT false;
```

### 3. Asset structure (preview images)
```
public/images/products/previews/
├── analisi-1/
│   ├── preview-1.jpg
│   ├── preview-2.jpg
│   └── preview-3.jpg
├── statistica/
│   ├── preview-1.jpg
│   ├── preview-2.jpg
│   └── preview-3.jpg
└── ...
```

**Importante:** Ogni prodotto deve avere almeno 3 preview images. La terza avrà blur automaticamente.

### 4. Feature list customization
Modifica `PRODUCT_FEATURES` in `product-detail.tsx` per aggiungere prodotti:

```tsx
const PRODUCT_FEATURES: Record<string, string[]> = {
  "tuo-slug": [
    "Feature 1",
    "Feature 2",
    "Feature 3",
    "Feature 4",
    "Feature 5",
  ],
};
```

Se slug non trovato, usa `DEFAULT_FEATURES`.

### 5. Tailwind classes utilizzate
- `.container-app` - max-w-md = 448px
- `.rounded-brand` - border-radius customizzato
- `.text-body-*`, `.text-display-*` - Typography system
- `.bg-primary-*`, `.bg-neutral-*` - Color palette

Assicurati che il nuovo sito abbia le stesse variabili CSS e Tailwind config.

### 6. Componenti UI dipendenze
- `<Button />` - da `components/ui/button`
- `<Badge />` - da `components/ui/badge`
- `<PriceDisplay />` - da `components/ui/price-display`
- `<StarRating />` - da `components/ui/star-rating`
- Lucide React icons

### 7. Utility functions dipendenze
- `trackViewProduct()` - da `lib/analytics.ts`
- `formatDate()` - da `lib/utils.ts`
- `formatPrice()` - da `lib/format-price.ts`

## Integration checklist

- [ ] Copia i 5 file dalla cartella `product-old/`
- [ ] Verifica che Supabase ha le colonne richieste (stripe_payment_link, display_name, is_approved)
- [ ] Crea/copia le preview images in `public/images/products/previews/`
- [ ] Aggiungi feature list per ogni prodotto in `PRODUCT_FEATURES`
- [ ] Verifica che UI components esistono e sono importabili
- [ ] Verifica Tailwind config (container-app, rounded-brand, typography, colors)
- [ ] Test preview carousel con almeno 3 immagini per prodotto
- [ ] Test reviews section (approval workflow)
- [ ] Test sticky CTA button (Stripe payment link)
- [ ] Analytics tracking (trackViewProduct)

## Note

- **Preview images**: Il carousel carica automaticamente 3 immagini. Se mancano, non mostra nulla (graceful error).
- **Reviews**: Solo reviews con `is_approved = true` vengono mostrate.
- **Stripe payment link**: Se `product.stripe_payment_link` è NULL, il button "Acquista ora" appare disabilitato.
- **Features list**: Se slug non trovato in `PRODUCT_FEATURES`, usa DEFAULT_FEATURES (5 items generici).
- **Sticky CTA**: Fisso in fondo sullo schermo (mobile-first design). Controlla `.safe-bottom` per notch handling.

## File da Alessandro per domande

Commit hash: **50c9ef7**  
Data creazione: 2026-05-30  
Responsabile backup: Claude Code
