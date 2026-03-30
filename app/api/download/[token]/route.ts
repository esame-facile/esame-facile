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

  // Scarica il file da Supabase e lo restituisce direttamente
  // così Content-Disposition: attachment forza il download su tutti i device (incluso iPhone)
  const { data: fileData, error: downloadError } = await supabase.storage
    .from("ebooks")
    .download(filePath);

  if (downloadError || !fileData) {
    return NextResponse.json(
      { error: "Impossibile generare il link di download" },
      { status: 500 }
    );
  }

  const fileName = tokenRecord.product?.name
    ? `${tokenRecord.product.name}.pdf`
    : "kit-esame.pdf";

  return new NextResponse(fileData, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${fileName}"`,
    },
  });
}
