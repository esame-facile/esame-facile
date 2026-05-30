-- UniPass Seed Reviews Data
-- Realistic reviews for all products

-- ============================================
-- Analisi 1 Reviews
-- ============================================
INSERT INTO reviews (id, product_id, display_name, rating, comment, is_approved, created_at) VALUES
  (gen_random_uuid(), 'b1b2c3d4-0001-4000-8000-000000000001', 'Marco R.', 5, 'Perfetto! Chiaro, ordinato, con tutti gli esercizi svolti. Ho usato questo per preparare l''esame e ho preso 28. Meglio di qualsiasi libro!', true, now() - interval '45 days'),
  (gen_random_uuid(), 'b1b2c3d4-0001-4000-8000-000000000001', 'Giulia M.', 5, 'Le mappe concettuali sono geniali. Finalmente riesco a vedere il collegamento tra i vari argomenti. Limite, derivata, integrale tutto collegato. Consigliato!', true, now() - interval '38 days'),
  (gen_random_uuid(), 'b1b2c3d4-0001-4000-8000-000000000001', 'Andrea T.', 4, 'Molto buono. Forse un po'' veloce in alcune dimostrazioni, ma nel complesso è ottimo. Prezzo giusto per la qualità.', true, now() - interval '25 days'),
  (gen_random_uuid(), 'b1b2c3d4-0001-4000-8000-000000000001', 'Sofia D.', 5, 'Ho preso 30! Questo materiale è stato fondamentale. Gli esercizi svolti passo-passo sono esattamente quello che serviva.', true, now() - interval '12 days');

-- ============================================
-- Analisi 2 Reviews
-- ============================================
INSERT INTO reviews (id, product_id, display_name, rating, comment, is_approved, created_at) VALUES
  (gen_random_uuid(), 'b1b2c3d4-0002-4000-8000-000000000002', 'Luca P.', 5, 'Analisi 2 è difficile ma questo appunto la rende comprensibile. Integrali doppi e equazioni differenziali finalmente chiari!', true, now() - interval '40 days'),
  (gen_random_uuid(), 'b1b2c3d4-0002-4000-8000-000000000002', 'Elena F.', 5, 'I campi vettoriali mi terrorizzavano. Con questo appunto e Stokes e Gauss diventano semplici. Grazie mille!', true, now() - interval '33 days'),
  (gen_random_uuid(), 'b1b2c3d4-0002-4000-8000-000000000002', 'Davide N.', 4, 'Buono. Manca qualche esercizio difficile tipo quelli che mette il prof in esame, ma è solido.', true, now() - interval '20 days');

-- ============================================
-- Anatomia Reviews
-- ============================================
INSERT INTO reviews (id, product_id, display_name, rating, comment, is_approved, created_at) VALUES
  (gen_random_uuid(), 'b1b2c3d4-0003-4000-8000-000000000003', 'Chiara B.', 5, 'Come studente di medicina, posso dire che questo è il miglior riassunto che ho trovato. Schemi perfetti per il ripasso veloce.', true, now() - interval '50 days'),
  (gen_random_uuid(), 'b1b2c3d4-0003-4000-8000-000000000003', 'Roberto S.', 5, 'Preparandomi per fisioterapia ho usato questo. Anatomia è tutto e questo appunto la spiega benissimo. Consigliato 100%', true, now() - interval '42 days'),
  (gen_random_uuid(), 'b1b2c3d4-0003-4000-8000-000000000003', 'Valentina L.', 5, 'I nomi latini, le origini/inserzioni dei muscoli, tutto è organizzato perfetto. Esame passato con 27.', true, now() - interval '28 days'),
  (gen_random_uuid(), 'b1b2c3d4-0003-4000-8000-000000000003', 'Giuseppe M.', 4, 'Buono, ma per gli apparati interni (digerente, respiratorio) avrei preferito più dettagli.', true, now() - interval '15 days');

-- ============================================
-- Fisica 1 Reviews
-- ============================================
INSERT INTO reviews (id, product_id, display_name, rating, comment, is_approved, created_at) VALUES
  (gen_random_uuid(), 'b1b2c3d4-0004-4000-8000-000000000004', 'Thomas K.', 5, 'Formulario completo ma non noioso. Ho capito QUANDO usare ogni formula e perchè. Raro trovare questo negli appunti.', true, now() - interval '48 days'),
  (gen_random_uuid(), 'b1b2c3d4-0004-4000-8000-000000000004', 'Martina C.', 5, 'Esercizi svolti passo passo. Il mio prof di Fisica mette esercizi simili all''esame e con questo appunto li ho capiti tutti. 29!', true, now() - interval '35 days'),
  (gen_random_uuid(), 'b1b2c3d4-0004-4000-8000-000000000004', 'Paolo V.', 5, 'Termodinamica era il mio incubo. Questo appunto l''ha trasformato nel mio argomento preferito. Merita cinque stelle!', true, now() - interval '22 days');

-- ============================================
-- Statistica Reviews
-- ============================================
INSERT INTO reviews (id, product_id, display_name, rating, comment, is_approved, created_at) VALUES
  (gen_random_uuid(), 'b1b2c3d4-0005-4000-8000-000000000005', 'Francesca G.', 5, 'p-value e gradi di libertà finalmente chiari! Questo appunto salva il voto di economia. Test di ipotesi non è più voodoo.', true, now() - interval '52 days'),
  (gen_random_uuid(), 'b1b2c3d4-0005-4000-8000-000000000005', 'Michele R.', 5, 'Tabella comparativa sui test statistici è ORO PURO. Non devo più chiedermi "quale test uso?" - lo schema dice tutto.', true, now() - interval '44 days'),
  (gen_random_uuid(), 'b1b2c3d4-0005-4000-8000-000000000005', 'Alessandra P.', 4, 'Molto utile. La parte sulla regressione potrebbe avere qualche esempio in più, ma nel complesso è eccellente.', true, now() - interval '30 days'),
  (gen_random_uuid(), 'b1b2c3d4-0005-4000-8000-000000000005', 'Riccardo M.', 5, 'Schema decisionale: leggi il problema → riconosci il caso → applica la formula. GENIALE. Finalmente riesco a fare gli esercizi autonomamente.', true, now() - interval '18 days');

-- ============================================
-- Biochimica Reviews
-- ============================================
INSERT INTO reviews (id, product_id, display_name, rating, comment, is_approved, created_at) VALUES
  (gen_random_uuid(), 'b1b2c3d4-0006-4000-8000-000000000006', 'Lucia F.', 5, 'Metabolismo è il capitolo più difficile di biochimica. Con questo appunto le vie metaboliche diventano coerenti. Mnemoniche utilissime!', true, now() - interval '46 days'),
  (gen_random_uuid(), 'b1b2c3d4-0006-4000-8000-000000000006', 'Matteo S.', 5, 'Le mappe metaboliche di glicolisi, Krebs, fosforilazione sono semplicemente perfette. Preparazione esame risolta!', true, now() - interval '37 days'),
  (gen_random_uuid(), 'b1b2c3d4-0006-4000-8000-000000000006', 'Federica Z.', 5, 'Enzimi e regolazione allosterica finalmente collegati tra loro. Appunto eccellente per medicina.', true, now() - interval '24 days');

-- ============================================
-- Diritto Privato Reviews
-- ============================================
INSERT INTO reviews (id, product_id, display_name, rating, comment, is_approved, created_at) VALUES
  (gen_random_uuid(), 'b1b2c3d4-0008-4000-8000-000000000008', 'Nicola T.', 5, 'Diritto privato è un caos di articoli. Questo appunto ORGANIZZA il caos. Finalmente vedo la logica! Perfetto per giurisprudenza.', true, now() - interval '49 days'),
  (gen_random_uuid(), 'b1b2c3d4-0008-4000-8000-000000000008', 'Giulio F.', 5, 'I riferimenti al Codice Civile sono precisi. Non è solo riassunto, è uno strumento didattico vero. Ho preso 26 all''esame orale!', true, now() - interval '36 days'),
  (gen_random_uuid(), 'b1b2c3d4-0008-4000-8000-000000000008', 'Sara V.', 5, 'La parte su famiglia e successioni è chiarissima. Tutti i colleghi mi hanno chiesto da dove veniva questo appunto!', true, now() - interval '23 days'),
  (gen_random_uuid(), 'b1b2c3d4-0008-4000-8000-000000000008', 'Antonio R.', 4, 'Buono. Per le successioni avrei preferito più esempi pratici, ma nel complesso vale la pena.', true, now() - interval '11 days');

-- ============================================
-- Informatica Reviews
-- ============================================
INSERT INTO reviews (id, product_id, display_name, rating, comment, is_approved, created_at) VALUES
  (gen_random_uuid(), 'b1b2c3d4-0009-4000-8000-000000000009', 'Jacopo L.', 5, 'Architettura dei calcolatori con schemi chiarissimi. Non sapevo come avrei fatto a ricordare cache, pipeline, tutto. Adesso sì!', true, now() - interval '43 days'),
  (gen_random_uuid(), 'b1b2c3d4-0009-4000-8000-000000000009', 'Valentina M.', 5, 'SQL e basi di dati finalmente spiegate bene. Modello ER con gli esempi è perfetto. Grazie!', true, now() - interval '32 days'),
  (gen_random_uuid(), 'b1b2c3d4-0009-4000-8000-000000000009', 'Leonardo B.', 5, 'O-notation e complessità algoritmi: mi aveva confuso per tutto il corso. Con questo appunto tutto è logico. Esame superato bene!', true, now() - interval '21 days');

-- ============================================
-- Chimica Reviews (if referenced in products)
-- ============================================
INSERT INTO reviews (id, product_id, display_name, rating, comment, is_approved, created_at) VALUES
  (gen_random_uuid(), 'b1b2c3d4-0007-4000-8000-000000000007', 'Alessio D.', 5, 'Stechiometria e bilanciamento redox gli argomenti che più stressano? Qui diventano meccanici. Metodo in 3 passi che funziona!', true, now() - interval '45 days'),
  (gen_random_uuid(), 'b1b2c3d4-0007-4000-8000-000000000007', 'Gianna P.', 5, 'Tavola periodica commentata è una rivoluzione. Finalmente so PERCHÈ l''elettronegatività cambia, non solo che cambia.', true, now() - interval '34 days'),
  (gen_random_uuid(), 'b1b2c3d4-0007-4000-8000-000000000007', 'Mattia G.', 4, 'Buono. Equilibri acido-base potrebbe avere qualche esercizio in più con pH e pOH.', true, now() - interval '19 days');
