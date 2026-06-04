self.addEventListener("push", (event) => {
  const data = event.data?.json() ?? {};
  const url = data.url ?? "/affiliati/dashboard";
  event.waitUntil(
    self.registration.showNotification(data.title ?? "Esame Facile", {
      body: data.body ?? "Nuova vendita!",
      icon: "/icon-192.png",
      badge: "/icon-192.png",
      data: { url },
      vibrate: [200, 100, 200],
    })
  );
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  const url = event.notification.data?.url ?? "/affiliati/dashboard";
  event.waitUntil(
    clients.matchAll({ type: "window", includeUncontrolled: true }).then((list) => {
      for (const client of list) {
        if (client.url.includes(url) && "focus" in client) return client.focus();
      }
      return clients.openWindow(url);
    })
  );
});
