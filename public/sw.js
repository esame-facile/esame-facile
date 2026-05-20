self.addEventListener("push", (event) => {
  const data = event.data?.json() ?? {};
  event.waitUntil(
    self.registration.showNotification(data.title ?? "Esame Facile", {
      body: data.body ?? "Nuova vendita!",
      icon: "/icon-192.png",
      badge: "/icon-192.png",
      data: { url: "/affiliati/dashboard" },
      vibrate: [200, 100, 200],
    })
  );
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  event.waitUntil(
    clients.matchAll({ type: "window", includeUncontrolled: true }).then((list) => {
      for (const client of list) {
        if (client.url.includes("/affiliati") && "focus" in client) return client.focus();
      }
      return clients.openWindow("/affiliati/dashboard");
    })
  );
});
