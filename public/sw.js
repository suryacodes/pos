const CACHE_NAME = 'pos-cache-v1'

const urlsToCache = [
    '/',
    '/index.html',
    '/manifest.json',
];



self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                return cache.addAll(urlsToCache);
            })
    );
});


self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            if (response && !navigator.onLine) {
                return response
            }
            return fetch(event.request)
        })
    )
})
