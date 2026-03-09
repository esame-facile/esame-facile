-- UniPass Seed Data
-- 8 real products with Stripe Payment Links

-- ============================================
-- Categories
-- ============================================
INSERT INTO categories (id, name, slug, description, icon) VALUES
  ('a1b2c3d4-0001-4000-8000-000000000001', 'Scienze e Ingegneria', 'scienze-ingegneria', 'Analisi, Fisica, Chimica e materie scientifiche', 'Atom'),
  ('a1b2c3d4-0002-4000-8000-000000000002', 'Medicina', 'medicina', 'Anatomia, Biochimica e materie medico-sanitarie', 'Heart'),
  ('a1b2c3d4-0003-4000-8000-000000000003', 'Economia e Statistica', 'economia-statistica', 'Statistica, Economia e materie quantitative', 'TrendingUp'),
  ('a1b2c3d4-0004-4000-8000-000000000004', 'Giurisprudenza', 'giurisprudenza', 'Diritto Privato, Pubblico e materie giuridiche', 'Scale');

-- ============================================
-- Products (all 19.99 EUR = 1999 cents)
-- ============================================
INSERT INTO products (id, category_id, name, slug, description, short_description, price, original_price, university, professor, academic_year, pages, format, is_featured, stripe_payment_link) VALUES
  (
    'b1b2c3d4-0001-4000-8000-000000000001',
    'a1b2c3d4-0001-4000-8000-000000000001',
    'Analisi 1',
    'analisi-1',
    'Riassunto completo di Analisi Matematica 1. Copre tutti gli argomenti fondamentali: limiti, continuità, derivate, integrali definiti e indefiniti, serie numeriche. Include esercizi svolti e dimostrazioni dei teoremi principali.',
    'Riassunto completo di Analisi 1 con esercizi svolti e dimostrazioni.',
    1999,
    NULL,
    'Università test',
    NULL,
    '2024/2025',
    NULL,
    'pdf',
    true,
    'https://buy.stripe.com/bJebJ26uXd8K6xm8BA9IQ0g'
  ),
  (
    'b1b2c3d4-0002-4000-8000-000000000002',
    'a1b2c3d4-0001-4000-8000-000000000001',
    'Analisi 2',
    'analisi-2',
    'Riassunto completo di Analisi Matematica 2. Argomenti trattati: funzioni a più variabili, derivate parziali, integrali multipli, equazioni differenziali, curve e superfici. Esercizi svolti per ogni argomento.',
    'Riassunto completo di Analisi 2 con esercizi svolti.',
    1999,
    NULL,
    'Università test',
    NULL,
    '2024/2025',
    NULL,
    'pdf',
    true,
    'https://buy.stripe.com/dRm9AUaLdfgSf3SbNM9IQ0h'
  ),
  (
    'b1b2c3d4-0003-4000-8000-000000000003',
    'a1b2c3d4-0002-4000-8000-000000000002',
    'Anatomia',
    'anatomia',
    'Riassunto di Anatomia Umana. Copre apparato locomotore, sistema nervoso, apparato cardiovascolare, respiratorio, digerente, urinario e riproduttore. Schemi e tavole anatomiche per il ripasso rapido.',
    'Riassunto di Anatomia Umana con schemi e tavole anatomiche.',
    1999,
    NULL,
    'Università test',
    NULL,
    '2024/2025',
    NULL,
    'pdf',
    true,
    'https://buy.stripe.com/14AdRa2eH5Gi6xm3hg9IQ0i'
  ),
  (
    'b1b2c3d4-0004-4000-8000-000000000004',
    'a1b2c3d4-0001-4000-8000-000000000001',
    'Fisica 1',
    'fisica-1',
    'Riassunto di Fisica Generale 1. Argomenti: cinematica, dinamica, lavoro ed energia, quantità di moto, rotazioni, termodinamica. Formulario completo e esercizi svolti passo passo.',
    'Riassunto di Fisica 1 con formulario e esercizi svolti.',
    1999,
    NULL,
    'Università test',
    NULL,
    '2024/2025',
    NULL,
    'pdf',
    true,
    'https://buy.stripe.com/14AeVe06zc4Gg7WdVU9IQ0k'
  ),
  (
    'b1b2c3d4-0005-4000-8000-000000000005',
    'a1b2c3d4-0003-4000-8000-000000000003',
    'Statistica',
    'statistica',
    'Riassunto completo di Statistica. Copre statistica descrittiva, probabilità, variabili aleatorie, distribuzioni, stima e intervalli di confidenza, test di ipotesi, regressione. Esercizi svolti con spiegazioni dettagliate.',
    'Riassunto di Statistica con esercizi svolti e spiegazioni.',
    1999,
    NULL,
    'Università test',
    NULL,
    '2024/2025',
    NULL,
    'pdf',
    false,
    'https://buy.stripe.com/dRm3cw7z16Km8Fu5po9IQ0l'
  ),
  (
    'b1b2c3d4-0006-4000-8000-000000000006',
    'a1b2c3d4-0002-4000-8000-000000000002',
    'Biochimica',
    'biochimica',
    'Riassunto di Biochimica. Argomenti: struttura e funzione delle proteine, enzimi e cinetica enzimatica, metabolismo glucidico, lipidico e proteico, ciclo di Krebs, fosforilazione ossidativa, regolazione metabolica.',
    'Riassunto di Biochimica con metabolismo e regolazione.',
    1999,
    NULL,
    'Università test',
    NULL,
    '2024/2025',
    NULL,
    'pdf',
    false,
    'https://buy.stripe.com/fZu00k1aD5Gig7W1989IQ0m'
  ),
  (
    'b1b2c3d4-0007-4000-8000-000000000007',
    'a1b2c3d4-0001-4000-8000-000000000001',
    'Chimica',
    'chimica',
    'Riassunto di Chimica Generale. Copre: struttura atomica, legami chimici, stechiometria, termodinamica chimica, cinetica, equilibri chimici, acidi e basi, elettrochimica. Esercizi svolti e tabelle riassuntive.',
    'Riassunto di Chimica Generale con esercizi e tabelle.',
    1999,
    NULL,
    'Università test',
    NULL,
    '2024/2025',
    NULL,
    'pdf',
    false,
    'https://buy.stripe.com/5kQbJ23iLgkWdZO5po9IQ0n'
  ),
  (
    'b1b2c3d4-0008-4000-8000-000000000008',
    'a1b2c3d4-0004-4000-8000-000000000004',
    'Diritto Privato',
    'diritto-privato',
    'Riassunto completo di Diritto Privato. Strutturato per argomenti: persone e capacità, diritti reali, obbligazioni, contratti, responsabilità civile, famiglia e successioni. Include riferimenti agli articoli del codice civile.',
    'Riassunto di Diritto Privato con riferimenti al codice civile.',
    1999,
    NULL,
    'Università test',
    NULL,
    '2024/2025',
    NULL,
    'pdf',
    false,
    'https://buy.stripe.com/3cI3cw6uX5Gif3ScRQ9IQ0o'
  );
