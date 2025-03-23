self.addEventListener('install', (event) => {
    console.log('Service Worker installed');
    event.waitUntil(
        caches.open('coolio-cache').then((cache) => {
            return cache.addAll([
                '/',
                '/index.html',
                '/css/index.css',
                '/textures/icons/logo.png'
            ]);
        })
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});