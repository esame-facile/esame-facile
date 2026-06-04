import webpush from "web-push";
import type { PushSubscriptionJSON } from "@/lib/affiliate-store";

webpush.setVapidDetails(
  process.env.VAPID_SUBJECT!,
  process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!,
  process.env.VAPID_PRIVATE_KEY!
);

export async function sendPushNotifications(
  subscriptions: PushSubscriptionJSON[],
  payload: { title: string; body: string; url?: string }
): Promise<PushSubscriptionJSON[]> {
  // Returns list of expired subscriptions to remove (HTTP 410)
  const expired: PushSubscriptionJSON[] = [];
  await Promise.allSettled(
    subscriptions.map(async (sub) => {
      try {
        await webpush.sendNotification(
          sub as webpush.PushSubscription,
          JSON.stringify(payload)
        );
      } catch (err: unknown) {
        if (
          err !== null &&
          typeof err === "object" &&
          "statusCode" in err &&
          (err as { statusCode: number }).statusCode === 410
        ) {
          expired.push(sub);
        }
      }
    })
  );
  return expired;
}
