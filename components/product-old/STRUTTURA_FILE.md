# 📁 Struttura File Completa per Alessandro

## 🎯 COSA HAI A DISPOSIZIONE

Tutto quello che serve è nel repository. Ecco ESATTAMENTE dove trovare ogni cosa:

---

## 1️⃣ COMPONENTI REACT (Copia questi file)

**Cartella:** `components/product-old/`

```
components/product-old/
├── product-detail.tsx          ✅ Componente principale (anteprima + descrizione + CTA)
├── product-reviews.tsx         ✅ Sezione recensioni
├── preview-carousel.tsx        ✅ Carousel immagini anteprima
├── product-detail-client.tsx   ✅ Wrapper client
├── page-product-detail.tsx     ✅ Pagina server per route [slug]
├── README.md                   ✅ Guida tecnica
├── INTEGRAZIONE_CHECKLIST.md   ✅ Checklist integrazione
└── STRUTTURA_FILE.md           ✅ QUESTO FILE
```

**Come usarli:**
```bash
# Copia intera cartella
cp -r components/product-old components/tuonuovosito/

# Oppure copia singoli file se hai già una struttura
cp components/product-old/product-detail.tsx tuosito/components/
```

---

## 2️⃣ DATABASE SEED DATA (SQL da eseguire)

**Cartella:** `supabase/`

### `seed.sql` → 9 PRODOTTI con DESCRIZIONI COMPLETE

```
📊 9 Prodotti:
├── Analisi 1        (b1b2c3d4-0001...) ✅ ID fisso, descrizione, link Stripe
├── Analisi 2        (b1b2c3d4-0002...) ✅
├── Anatomia         (b1b2c3d4-0003...) ✅
├── Fisica 1         (b1b2c3d4-0004...) ✅
├── Statistica       (b1b2c3d4-0005...) ✅
├── Biochimica       (b1b2c3d4-0006...) ✅
├── Chimica          (b1b2c3d4-0007...) ✅
├── Diritto Privato  (b1b2c3d4-0008...) ✅
└── Informatica      (b1b2c3d4-0009...) ✅

✅ Ogni prodotto ha:
  - Descrizione lunga completa
  - Descrizione breve
  - Link Stripe funzionante
  - Categoria corretta
  - Prezzo: 1999 cents (19,99€)
```

**Come usarlo:**
```bash
# 1. Apri Supabase console
# 2. SQL Editor
# 3. Copia-incolla tutto il contenuto di supabase/seed.sql
# 4. Run

# OPPURE via CLI:
supabase db push < supabase/seed.sql
```

### `seed-reviews.sql` → 6 REVIEWS VERE

```
📝 6 Reviews autentiche dal vecchio sito:
├── Marco R.     → Analisi 1   (5 stelle)
├── Giulia T.    → Diritto Privato (5 stelle)
├── Alessandro M. → Fisica 1   (5 stelle)
├── Sara L.      → Anatomia   (4 stelle)
├── Federico B.  → Statistica (5 stelle)
└── Chiara P.    → Chimica    (5 stelle)

✅ Ogni review ha:
  - Nome e cognome studente
  - Testo completo e autentico
  - Rating (stelle)
  - Product ID corretto
  - is_approved = true
```

---

## 3️⃣ IMMAGINI (Copia in public/)

### Cover Images
**Cartella:** `public/images/products/covers/`

```
10 immagini copertina (3:4 aspect ratio):
├── analisi-1.jpg       (234 KB) ✅
├── analisi-2.jpg       (241 KB) ✅
├── anatomia.jpg        (728 KB) ✅
├── biochimica.png      (2.7 MB) ✅
├── chimica.png         (2.6 MB) ✅
├── diritto-commerciale.jpg (2.4 MB) ✅
├── diritto-privato.png (2.5 MB) ✅
├── fisica-1.jpg        (729 KB) ✅
├── informatica.jpg     (728 KB) ✅
└── statistica.png      (2.5 MB) ✅
```

**Come usarle:**
```bash
# Copia la cartella INTERA
cp -r public/images/products/covers tuosito/public/images/products/

# Poi nel seed.sql, il percorso è:
preview_image: '/images/products/covers/analisi-1.jpg'
```

### Preview Images (Anteprima Kit)
**Cartella:** `public/images/products/previews/`

```
Struttura per anteprima visibile (3 pagine per prodotto):

previews/
├── analisi-1/
│   ├── preview-1.jpg  ✅
│   ├── preview-2.jpg  ✅
│   └── preview-3.jpg  ✅
├── analisi-2/
│   ├── preview-1.jpg  ✅
│   ├── preview-2.jpg  ✅
│   └── preview-3.jpg  ✅
├── anatomia/
│   ├── preview-1.jpg  ✅
│   ├── preview-2.jpg  ✅
│   └── preview-3.jpg  ✅
├── biochimica/
│   ├── preview-1.jpg  ✅
│   ├── preview-2.jpg  ✅
│   └── preview-3.jpg  ✅
├── chimica/
│   ├── preview-1.jpg  ✅
│   ├── preview-2.jpg  ✅
│   └── preview-3.jpg  ✅
├── diritto-privato/
│   ├── preview-1.jpg  ✅
│   ├── preview-2.jpg  ✅
│   └── preview-3.jpg  ✅
├── fisica-1/
│   ├── preview-1.jpg  ✅
│   ├── preview-2.jpg  ✅
│   └── preview-3.jpg  ✅
├── informatica/
│   ├── preview-1.jpg  ✅
│   ├── preview-2.jpg  ✅
│   └── preview-3.jpg  ✅
├── statistica/
│   ├── preview-1.jpg  ✅
│   ├── preview-2.jpg  ✅
│   └── preview-3.jpg  ✅
└── diritto-commerciale/
    ├── preview-1.jpg  ✅
    ├── preview-2.jpg  ✅
    └── preview-3.jpg  ✅
```

**Come usarle:**
```bash
# Copia la cartella INTERA
cp -r public/images/products/previews tuosito/public/images/products/

# Nel componente preview-carousel.tsx, il percorso è:
/images/products/previews/{slug}/preview-1.jpg
/images/products/previews/{slug}/preview-2.jpg
/images/products/previews/{slug}/preview-3.jpg
```

---

## 4️⃣ COME VERIFICARE CHE TUTTO È SINCRONIZZATO

```bash
# 1. Verifica che le cartelle esistono
ls -la public/images/products/covers/
ls -la public/images/products/previews/

# 2. Verifica che ci sono i file
find public/images/products -type f | wc -l
# Deve essere: 10 (covers) + 30 (previews) = 40 file

# 3. Verifica il seed data
cat supabase/seed.sql | grep "INSERT INTO products"
# Deve mostrare 9 righe di INSERT

# 4. Verifica il seed reviews
cat supabase/seed-reviews.sql | grep "INSERT INTO reviews"
# Deve mostrare 6 righe di INSERT
```

---

## 5️⃣ CHECKLIST RAPIDA PER ALESSANDRO

### Step 1: Clona tutto
```bash
git clone https://github.com/esame-facile/esame-facile.git
cd esame-facile
```

### Step 2: Copia i componenti
```bash
# Copia dalla cartella product-old al tuo sito
cp -r components/product-old tuosito/components/
```

### Step 3: Setup database
```bash
# Nel tuo Supabase:
# 1. SQL Editor → nuovo query
# 2. Copia-incolla supabase/seed.sql
# 3. Run

# Poi:
# 1. SQL Editor → nuovo query
# 2. Copia-incolla supabase/seed-reviews.sql
# 3. Run
```

### Step 4: Copia immagini
```bash
# Nel tuo progetto:
cp -r public/images/products tuodir/public/images/
```

### Step 5: Verifica
```bash
# Nel browser:
# - Visita: http://localhost:3000/catalogo/analisi-1
# - Deve mostrare: copertina, descrizione, preview carousel, reviews
# - Deve avere il bottone "Acquista ora" (link Stripe)
```

---

## 🔍 SE QUALCOSA NON SI VEDE

| Problema | Soluzione |
|----------|-----------|
| Immagini non caricate | Verifica che `/public/images/products/covers/` esiste e ha 10 file JPG/PNG |
| Preview non visibile | Verifica che `/public/images/products/previews/{slug}/` ha 3 file (preview-1/2/3.jpg) |
| Reviews vuote | Esegui `supabase/seed-reviews.sql` e verifica che `is_approved = true` |
| Prezzo non mostra | Verifica che `lib/format-price.ts` esiste e formatta in EUR |
| Link Stripe non funziona | Apri browser console → Network → clicca "Acquista ora" → vedi il link vero |
| Componente non importa | Controlla che `components/ui/{button,badge,star-rating,price-display}.tsx` esistono |

---

## 📞 DOMANDE FREQUENTI

**P: Dov'è il file XYZ?**
R: Guarda questa tabella — se non è elencato qui, non esiste nel repo.

**P: Posso usare solo 5 prodotti?**
R: Sì, modifica `supabase/seed.sql` e commenta le ultime 4 righe di `INSERT`.

**P: Posso cambiare i prezzi?**
R: Sì, nel `supabase/seed.sql` cambia la colonna `price` (in cents: 1999 = 19,99€).

**P: Devo caricare le immagini su Supabase Storage?**
R: No. Tienile in `/public/images/` e il carousel le carica dal file system. Se vuoi Storage, leggi `README.md`.

---

**Generated:** 2026-05-30  
**Repo:** https://github.com/esame-facile/esame-facile  
**Branch:** main  
**Last commit:** 3984f88
