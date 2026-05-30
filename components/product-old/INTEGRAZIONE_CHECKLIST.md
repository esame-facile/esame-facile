# Checklist Integrazione Product Detail Components

## 📋 FILE DA COPIARE (dal vecchio sito)

### 1️⃣ COMPONENTI REACT
```
components/product-old/
├── product-detail.tsx ✅
├── product-reviews.tsx ✅
├── preview-carousel.tsx ✅
├── product-detail-client.tsx ✅
└── README.md ✅
```

### 2️⃣ PAGINA SERVER (ROTTE)
```
app/(main)/catalogo/[slug]/
├── page.tsx (contiene ProductDetailClient) → COPIARE da product-old/page-product-detail.tsx
└── product-detail-client.tsx → COPIARE da product-old/
```

### 3️⃣ ASSET - IMMAGINI
```
public/images/products/
├── covers/
│   ├── analisi-1.jpg ✅
│   ├── analisi-2.jpg ✅
│   ├── anatomia.jpg ✅
│   ├── biochimica.png ✅
│   ├── chimica.png ✅
│   ├── diritto-commerciale.jpg ✅
│   ├── diritto-privato.png ✅
│   ├── fisica-1.jpg ✅
│   ├── informatica.jpg ✅
│   └── statistica.png ✅
└── previews/
    ├── analisi-1/
    │   ├── preview-1.jpg ✅
    │   ├── preview-2.jpg ✅
    │   └── preview-3.jpg ✅
    ├── anatomia/
    ├── chimica/
    ├── diritto-privato/
    ├── fisica-1/
    ├── informatica/
    ├── statistica/
    └── ... (8 cartelle totali)
```

### 4️⃣ DATABASE - SEED DATA
```
supabase/
├── seed.sql (9 prodotti) ✅
└── seed-reviews.sql (6 reviews vere) ✅
```

## 🔗 DIPENDENZE - FILE CHE DEVONO GIÀ ESISTERE

### UI Components (da `components/ui/`)
```
✅ button.tsx → importato in product-detail.tsx
✅ badge.tsx → importato in product-detail.tsx
✅ price-display.tsx → importato in product-detail.tsx
✅ star-rating.tsx → importato in product-detail.tsx e product-reviews.tsx
```

### Utilities (da `lib/`)
```
✅ utils.ts → contiene formatDate() e cn()
✅ analytics.ts → contiene trackViewProduct()
✅ format-price.ts → contiene formatPrice() [opzionale, non usato in product-detail]
```

### Types (da `types/`)
```
✅ database.ts → contiene Product, Review
✅ product.ts → type di Product
✅ order.ts → type di Order
```

### Next.js Image Component
```
✅ from "next/image" → Image component
```

### Lucide React Icons
```
✅ FileText, User, Calendar, BookOpen, CreditCard, CheckCircle2, Shield, Eye, ChevronLeft, ChevronRight, Lock
```

## ✔️ VERIFICHE PRE-INTEGRAZIONE

### Database
- [ ] Tabella `products` ha colonne:
  - `id`, `category_id`, `name`, `slug`, `description`, `short_description`
  - `price`, `original_price`, `university`, `professor`, `academic_year`, `pages`
  - `format`, `is_featured`, `stripe_payment_link`, `preview_image`
  - `average_rating`, `review_count`
- [ ] Tabella `reviews` ha colonne:
  - `id`, `product_id`, `display_name`, `rating`, `comment`
  - `is_approved`, `created_at`
- [ ] Tabella `categories` esiste e ha almeno 4 categorie

### Supabase Storage
- [ ] Folder `products/previews/` esiste
- [ ] Folder `products/covers/` esiste
- [ ] Signed URL permissions sono configurate per download tokens

### CSS/Tailwind
- [ ] Classe `.container-app` è definita (max-w-md = 448px)
- [ ] Classe `.rounded-brand` è definita
- [ ] Typography system ha classi `.text-body-*` e `.text-display-*`
- [ ] Colori: `primary-50` fino `primary-700`, `neutral-*`, `accent-*` definiti
- [ ] Animazione `animate-marquee-slow` esiste (se usi ReviewsMarquee)

### Tailwind Config
```javascript
// tailwind.config.ts
module.exports = {
  content: [
    './components/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      maxWidth: {
        'app': '448px', // .container-app
      },
      borderRadius: {
        'brand': '0.5rem', // .rounded-brand
      },
      // ... colori e altre estensioni
    },
  },
}
```

## 📱 LAYOUT STRUCTURE

Il componente `ProductDetail` è pensato per essere usato così:

```tsx
// app/(main)/catalogo/[slug]/page.tsx
export default async function ProductPage({ params }: Props) {
  const supabase = createServerComponentClient();
  
  const { data: product } = await supabase
    .from("products")
    .select("*, category:categories(*)")
    .eq("slug", params.slug)
    .eq("is_active", true)
    .single();

  const { data: reviews } = await supabase
    .from("reviews")
    .select("*")
    .eq("product_id", product.id)
    .eq("is_approved", true)
    .order("created_at", { ascending: false });

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <ProductDetailClient product={product} reviews={reviews || []} />
    </>
  );
}
```

## 🔄 SETUP COMPLETO PASSO-PASSO

1. **Copia file componenti**
   ```bash
   cp -r components/product-old/* components/product-new/
   ```

2. **Copia pagine**
   ```bash
   cp components/product-old/page-product-detail.tsx app/(main)/catalogo/[slug]/page.tsx
   cp components/product-old/product-detail-client.tsx app/(main)/catalogo/[slug]/
   ```

3. **Verifica dipendenze** (devono già esistere)
   - components/ui/{button,badge,price-display,star-rating}.tsx
   - lib/{utils,analytics}.ts
   - types/database.ts

4. **Setup database**
   ```bash
   supabase db push < supabase/seed.sql
   supabase db push < supabase/seed-reviews.sql
   ```

5. **Setup Supabase Storage**
   - Copia cartelle: public/images/products/covers/ → Supabase Storage
   - Copia cartelle: public/images/products/previews/ → Supabase Storage
   - OPPURE: Mantieni in public/ se usi file locali (più veloce in dev)

6. **Verifica Tailwind**
   - Run: `npm run build`
   - Verifica che non ci siano errori di classe CSS sconosciute

7. **Test**
   ```bash
   npm run dev
   # Visita: http://localhost:3000/catalogo/analisi-1
   ```

## 🚨 POSSIBILI PROBLEMI

### Immagini non caricate
- **Causa**: Percorsi `/images/products/previews/{slug}/preview-{n}.jpg` non trovati
- **Fix**: Verifica che le cartelle esistano in `public/images/products/previews/`

### Reviews vuote
- **Causa**: Reviews non approved nel database
- **Fix**: Verifica `is_approved = true` in reviews table

### Prezzo non formattato
- **Causa**: Manca import di `formatPrice()`
- **Fix**: Assicurati che `lib/format-price.ts` esista

### Rating non mostra stelle
- **Causa**: Manca `StarRating` component
- **Fix**: Verifica che `components/ui/star-rating.tsx` esista

### Layout sbagliato
- **Causa**: Tailwind non ha `.container-app` o `.rounded-brand`
- **Fix**: Aggiungi a tailwind.config.ts:
  ```javascript
  theme: {
    extend: {
      maxWidth: { app: '448px' },
      borderRadius: { brand: '0.5rem' },
    }
  }
  ```

## 📞 SUPPORTO

Se mancano file:
1. Verifica che il nuovo sito abbia:
   - `components/ui/` (Button, Badge, PriceDisplay, StarRating)
   - `lib/{utils,analytics,format-price}.ts`
   - `types/{database,product}.ts`

2. Se mancano, copia dal vecchio repo o implementali

3. Verifica imports nei componenti product-old - aggiusta path alias `@/` se necessario
