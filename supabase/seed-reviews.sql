-- UniPass Seed Reviews Data
-- Real reviews from old site

-- ============================================
-- Analisi 1 - Marco R.
-- ============================================
INSERT INTO reviews (id, product_id, display_name, rating, comment, is_approved, created_at) VALUES
  (gen_random_uuid(), 'b1b2c3d4-0001-4000-8000-000000000001', 'Marco R.', 5, 'Ho comprato Analisi 1 tre giorni prima dell''esame. Non dico che sia magia, ma 28 non me lo aspettavo proprio.', true, now() - interval '45 days');

-- ============================================
-- Diritto Privato - Giulia T.
-- ============================================
INSERT INTO reviews (id, product_id, display_name, rating, comment, is_approved, created_at) VALUES
  (gen_random_uuid(), 'b1b2c3d4-0008-4000-8000-000000000008', 'Giulia T.', 5, 'Diritto Privato riassunto in modo che si capisce davvero, non come il libro da 900 pagine. Soldi spesi bene.', true, now() - interval '42 days');

-- ============================================
-- Fisica 1 - Alessandro M.
-- ============================================
INSERT INTO reviews (id, product_id, display_name, rating, comment, is_approved, created_at) VALUES
  (gen_random_uuid(), 'b1b2c3d4-0004-4000-8000-000000000004', 'Alessandro M.', 5, 'Fisica 1 era il mio incubo. Con questo kit ho finalmente capito la termodinamica, cosa che il prof non è riuscito a fare in 3 mesi.', true, now() - interval '38 days');

-- ============================================
-- Anatomia - Sara L.
-- ============================================
INSERT INTO reviews (id, product_id, display_name, rating, comment, is_approved, created_at) VALUES
  (gen_random_uuid(), 'b1b2c3d4-0003-4000-8000-000000000003', 'Sara L.', 4, 'Per Anatomia serviva qualcosa di schematico. Questo kit è esattamente quello: schemi chiari, niente fuffa.', true, now() - interval '35 days');

-- ============================================
-- Statistica - Federico B.
-- ============================================
INSERT INTO reviews (id, product_id, display_name, rating, comment, is_approved, created_at) VALUES
  (gen_random_uuid(), 'b1b2c3d4-0005-4000-8000-000000000005', 'Federico B.', 5, 'Statistica mi faceva schifo. Ho preso il kit, studiato due weekend e passato con 28. Li vale tutti.', true, now() - interval '32 days');

-- ============================================
-- Chimica - Chiara P.
-- ============================================
INSERT INTO reviews (id, product_id, display_name, rating, comment, is_approved, created_at) VALUES
  (gen_random_uuid(), 'b1b2c3d4-0007-4000-8000-000000000007', 'Chiara P.', 5, 'Chimica era l''ultimo esame che mi mancava. Comprato il kit lunedì, passato venerdì. Non ci credo ancora.', true, now() - interval '28 days');
