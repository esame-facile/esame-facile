import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase-server";
import { DOWNLOAD_CONFIG } from "@/lib/constants";

export async function GET(
  _request: NextRequest,
  { params }: { params: { token: string } }
) {
  const supabase = createAdminClient();

  // Find download token
  const { data: tokenRecord, error } = await supabase
    .from("download_tokens")
    .select("*, product:products(file_path, name)")
    .eq("token", params.token)
    .single();

  if (error || !tokenRecord) {
    return NextResponse.json(
      { error: "Link di download non valido" },
      { status: 404 }
    );
  }

  // Check expiry
  if (new Date(tokenRecord.expires_at) < new Date()) {
    return NextResponse.json(
      { error: "Il link di download è scaduto" },
      { status: 410 }
    );
  }

  // Check download count
  if (tokenRecord.download_count >= tokenRecord.max_downloads) {
    return NextResponse.json(
      {
        error: `Hai raggiunto il limite massimo di ${DOWNLOAD_CONFIG.maxDownloads} download`,
      },
      { status: 429 }
    );
  }

  const rawPath = tokenRecord.product?.file_path;
  if (!rawPath) {
    return NextResponse.json(
      { error: "File non trovato" },
      { status: 404 }
    );
  }

  // Rimuove prefisso bucket se presente (es. "ebooks/file.pdf" → "file.pdf")
  const filePath = rawPath.replace(/^ebooks\//, "");

  // Increment download count
  await supabase
    .from("download_tokens")
    .update({ download_count: tokenRecord.download_count + 1 })
    .eq("id", tokenRecord.id);

  const fileName = tokenRecord.product?.name
    ? `${tokenRecord.product.name}.pdf`
    : "kit-esame.pdf";

  // Redirect a una signed URL con download forzato (opzione `download` →
  // Content-Disposition: attachment, funziona anche su iPhone).
  // NON bufferizziamo il file nella funzione: i pack grandi (>4.5MB, es. i pack
  // Maturità da ~12MB) superavano il limite di risposta serverless di Vercel e
  // restituivano 500. La signed URL è servita da Supabase, senza limiti di size.
  const { data: signed, error: signError } = await supabase.storage
    .from("ebooks")
    .createSignedUrl(filePath, 60 * 10, { download: fileName });

  if (signError || !signed?.signedUrl) {
    return NextResponse.json(
      { error: "Impossibile generare il link di download" },
      { status: 500 }
    );
  }

  return NextResponse.redirect(signed.signedUrl);
}
