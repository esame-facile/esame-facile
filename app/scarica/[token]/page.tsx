"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Download, CheckCircle2, Smartphone } from "lucide-react";

export default function DownloadPage() {
  const params = useParams();
  const token = params.token as string;
  const [downloaded, setDownloaded] = useState(false);

  const downloadUrl = `/api/download/${token}`;

  useEffect(() => {
    // Auto-avvia il download dopo 1 secondo
    const timer = setTimeout(() => {
      const a = document.createElement("a");
      a.href = downloadUrl;
      a.download = "";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      setDownloaded(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, [downloadUrl]);

  return (
    <div style={{
      minHeight: "100vh",
      background: "#0a0a0a",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "24px",
      fontFamily: "system-ui, sans-serif",
    }}>
      <div style={{
        maxWidth: "400px",
        width: "100%",
        textAlign: "center",
      }}>
        {/* Logo */}
        <p style={{ color: "#6366f1", fontWeight: 800, fontSize: "18px", marginBottom: "32px" }}>
          Esame Facile
        </p>

        {/* Icon */}
        <div style={{
          width: "80px",
          height: "80px",
          background: "#1e1b4b",
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: "0 auto 24px",
          border: "2px solid #4338ca",
        }}>
          {downloaded
            ? <CheckCircle2 size={36} color="#22c55e" />
            : <Download size={36} color="#6366f1" />
          }
        </div>

        <h1 style={{ color: "#ffffff", fontSize: "24px", fontWeight: 800, margin: "0 0 8px" }}>
          {downloaded ? "Download avviato!" : "Il tuo kit è pronto"}
        </h1>
        <p style={{ color: "#9ca3af", fontSize: "15px", margin: "0 0 32px" }}>
          {downloaded
            ? "Controlla i tuoi file scaricati."
            : "Il download parte automaticamente..."}
        </p>

        {/* Tasto download manuale */}
        <a
          href={downloadUrl}
          download
          style={{
            display: "block",
            background: "#6366f1",
            color: "#ffffff",
            padding: "16px 24px",
            borderRadius: "12px",
            textDecoration: "none",
            fontWeight: 700,
            fontSize: "16px",
            marginBottom: "24px",
          }}
        >
          Scarica il PDF
        </a>

        {/* Istruzioni iPhone */}
        <div style={{
          background: "#1a1a1a",
          border: "1px solid #2a2a2a",
          borderRadius: "12px",
          padding: "16px",
          textAlign: "left",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "10px" }}>
            <Smartphone size={16} color="#f59e0b" />
            <span style={{ color: "#f59e0b", fontWeight: 700, fontSize: "13px" }}>
              Su iPhone
            </span>
          </div>
          <ol style={{ color: "#9ca3af", fontSize: "13px", margin: 0, paddingLeft: "20px", lineHeight: "1.8" }}>
            <li>Clicca &quot;Scarica il PDF&quot; qui sopra</li>
            <li>Quando si apre il PDF, tocca l&apos;icona <strong style={{ color: "#ffffff" }}>Condividi</strong> (quadrato con freccia in su)</li>
            <li>Scegli <strong style={{ color: "#ffffff" }}>Salva su File</strong> oppure <strong style={{ color: "#ffffff" }}>Aggiungi a Libri</strong></li>
          </ol>
        </div>

        <p style={{ color: "#4b5563", fontSize: "12px", marginTop: "24px" }}>
          Problemi? Scrivici su{" "}
          <a href="https://wa.me/37258472379" style={{ color: "#6366f1" }}>WhatsApp</a>
        </p>
      </div>
    </div>
  );
}
