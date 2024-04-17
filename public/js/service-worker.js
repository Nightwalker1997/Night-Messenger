function registerServiceWorker() {
    if (typeof window !== "undefined") {
        if ("serviceWorker" in navigator) {
            navigator.serviceWorker.register("/js/sw.js").then((registration) => {
                console.info("Service Worker registration successful:", registration);
            });
        }
    }
}
  
registerServiceWorker();