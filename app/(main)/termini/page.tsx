import { Metadata } from "next";
import { SITE_CONFIG } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Termini e Condizioni",
  description: "Termini e condizioni di utilizzo di Esame Facile.",
};

export default function TerminiPage() {
  return (
    <div className="container-app py-10">
      <h1 className="text-display-md mb-6">Termini e Condizioni</h1>

      <div className="space-y-6 text-body-sm text-neutral-700 leading-relaxed">
        <p>
          <em>Ultimo aggiornamento: marzo 2026</em>
        </p>

        <h2 className="text-body-lg font-bold text-neutral-900 mt-8">
          1. Oggetto
        </h2>
        <p>
          I presenti Termini e Condizioni regolano l&apos;acquisto di prodotti
          digitali (kit con schemi e strategie in formato PDF) tramite il
          sito {SITE_CONFIG.name} ({SITE_CONFIG.url}).
        </p>

        <h2 className="text-body-lg font-bold text-neutral-900 mt-8">
          2. Prodotti digitali
        </h2>
        <p>
          Tutti i prodotti venduti su {SITE_CONFIG.name} sono contenuti
          digitali in formato PDF. L&apos;acquirente riceve un link di download
          via email dopo il completamento del pagamento.
        </p>

        <h2 className="text-body-lg font-bold text-neutral-900 mt-8">
          3. Download
        </h2>
        <ul className="list-disc pl-5 space-y-1">
          <li>Ogni link di download è valido per 48 ore dalla data di acquisto.</li>
          <li>È consentito un massimo di 5 download per ogni prodotto acquistato.</li>
          <li>
            In caso di problemi tecnici con il download, contattaci a{" "}
            <a
              href={`mailto:${SITE_CONFIG.email}`}
              className="text-primary-400"
            >
              {SITE_CONFIG.email}
            </a>
            .
          </li>
        </ul>

        <h2 className="text-body-lg font-bold text-neutral-900 mt-8">
          4. Prezzi e pagamento
        </h2>
        <p>
          Tutti i prezzi sono espressi in Euro (EUR) e includono l&apos;IVA ove
          applicabile. Il pagamento avviene tramite Stripe con carta di credito
          o debito.
        </p>

        <h2 className="text-body-lg font-bold text-neutral-900 mt-8">
          5. Diritto di recesso
        </h2>
        <p>
          Ai sensi dell&apos;art. 59, comma 1, lett. o) del Codice del Consumo
          (D.Lgs. 206/2005), il diritto di recesso di 14 giorni <strong>non si applica</strong> ai
          contenuti digitali forniti su supporto non materiale la cui esecuzione
          è iniziata con l&apos;accordo espresso del consumatore e con la sua
          espressa rinuncia al diritto di recesso. Procedendo all&apos;acquisto
          e avviando il download, il consumatore acconsente espressamente
          all&apos;esecuzione immediata del contratto e dichiara di rinunciare
          al diritto di recesso.
        </p>

        <h2 className="text-body-lg font-bold text-neutral-900 mt-8">
          6. Garanzia volontaria di rimborso
        </h2>
        <p>
          Nonostante l&apos;esclusione legale del diritto di recesso,{" "}
          {SITE_CONFIG.name} offre volontariamente una garanzia di rimborso
          entro 7 giorni dall&apos;acquisto, alle seguenti condizioni:
        </p>
        <ul className="list-disc pl-5 space-y-1 mt-2">
          <li>La richiesta deve pervenire entro 7 giorni dalla data di acquisto tramite WhatsApp o email.</li>
          <li>L&apos;acquirente deve indicare il motivo della richiesta.</li>
          <li>
            La garanzia non si applica in caso di utilizzo intensivo del materiale
            (più di 2 download registrati dal sistema) o in caso di richiesta
            successiva al superamento dell&apos;esame per cui il kit era destinato.
          </li>
          <li>
            {SITE_CONFIG.name} si riserva il diritto di rifiutare rimborsi in
            presenza di segnali di utilizzo fraudolento, verificabili tramite
            i log di download registrati automaticamente dal sistema (data,
            ora, numero di accessi, indirizzo IP).
          </li>
          <li>
            In caso di rimborso accordato, il link di download viene
            immediatamente disattivato e l&apos;acquirente è tenuto a eliminare
            tutte le copie del materiale scaricato.
          </li>
        </ul>

        <h2 className="text-body-lg font-bold text-neutral-900 mt-8">
          7. Tracciamento dei download e prove di utilizzo
        </h2>
        <p>
          Il sistema registra automaticamente per ogni download: data e ora di
          accesso, numero di download effettuati, indirizzo IP. Tali dati
          costituiscono prova dell&apos;avvenuta consegna e utilizzo del
          contenuto digitale e possono essere utilizzati in caso di contestazione
          o chargeback presso il circuito di pagamento.
        </p>

        <h2 className="text-body-lg font-bold text-neutral-900 mt-8">
          8. Chargeback e contestazioni
        </h2>
        <p>
          In caso di contestazione del pagamento (chargeback) presso la propria
          banca o circuito di pagamento, {SITE_CONFIG.name} si riserva il diritto
          di fornire all&apos;operatore di pagamento tutte le prove disponibili
          attestanti la consegna del prodotto digitale e il suo utilizzo
          (log di download, indirizzo email, indirizzo IP, timestamp di accesso).
          Contestazioni fraudolente potranno essere segnalate alle autorità
          competenti.
        </p>

        <h2 className="text-body-lg font-bold text-neutral-900 mt-8">
          9. Proprietà intellettuale
        </h2>
        <p>
          I materiali acquistati sono destinati esclusivamente all&apos;uso
          personale dell&apos;acquirente. È vietata la redistribuzione, la
          rivendita o la condivisione dei materiali acquistati, anche parziale,
          in qualsiasi formato. La violazione di tale disposizione potrà essere
          perseguita ai sensi della normativa sul diritto d&apos;autore
          (L. 633/1941).
        </p>

        <h2 className="text-body-lg font-bold text-neutral-900 mt-8">
          10. Limitazione di responsabilità
        </h2>
        <p>
          {SITE_CONFIG.name} non garantisce il superamento degli esami. I
          materiali sono strumenti di supporto allo studio e non sostituiscono
          la frequenza delle lezioni e lo studio personale.
        </p>

        <h2 className="text-body-lg font-bold text-neutral-900 mt-8">
          11. Contatti
        </h2>
        <p>
          Per qualsiasi domanda relativa ai presenti Termini e Condizioni,
          scrivi a{" "}
          <a
            href={`mailto:${SITE_CONFIG.email}`}
            className="text-primary-400"
          >
            {SITE_CONFIG.email}
          </a>
          .
        </p>
      </div>
    </div>
  );
}
