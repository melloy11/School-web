const CACHE_NAME = "tachs-v1";

const FILES_TO_CACHE = [
    "./",
    "./school.html",
    "./manifest.json"
];


// =========================================
// INSTALL
// =========================================

self.addEventListener("install", event => {

    console.log("TACHS Service Worker installing...");

    event.waitUntil(

        caches.open(CACHE_NAME)
            .then(cache => {

                return cache.addAll(FILES_TO_CACHE);

            })

    );

    self.skipWaiting();

});


// =========================================
// ACTIVATE
// =========================================

self.addEventListener("activate", event => {

    console.log("TACHS Service Worker activated!");

    event.waitUntil(

        caches.keys().then(cacheNames => {

            return Promise.all(

                cacheNames.map(cacheName => {

                    if(
                        cacheName !== CACHE_NAME
                    ){

                        return caches.delete(
                            cacheName
                        );

                    }

                })

            );

        })

    );

    self.clients.claim();

});


// =========================================
// FETCH
// =========================================

self.addEventListener("fetch", event => {

    event.respondWith(

        caches.match(event.request)
            .then(cachedResponse => {

                if(cachedResponse){

                    return cachedResponse;

                }

                return fetch(event.request);

            })

    );

});