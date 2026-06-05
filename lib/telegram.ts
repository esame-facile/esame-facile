// Invio notifiche su Telegram. Richiede TELEGRAM_BOT_TOKEN e TELEGRAM_CHAT_ID.
export async function sendTelegram(text: string): Promise<boolean> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) {
    console.error("[telegram] TELEGRAM_BOT_TOKEN o TELEGRAM_CHAT_ID mancanti");
    return false;
  }
  try {
    const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        parse_mode: "HTML",
        disable_web_page_preview: true,
      }),
    });
    if (!res.ok) {
      console.error("[telegram] send failed:", res.status, await res.text());
      return false;
    }
    return true;
  } catch (err) {
    console.error("[telegram] error:", err);
    return false;
  }
}
