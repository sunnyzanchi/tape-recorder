// @flow
var cacheName: string = 'cache-v1';
var urlsToCache: Array<string> = [
  '/',
  '/css/main.css',
  'js/main.bundle.js'
];

/* Installation */
self.addEventListener('install', function(e){
  e.waitUntil(
    caches.open(cacheName)
    .then(function(cache){
      console.log('Opened cache');
      return cache.addAll(urlsToCache);
    })
  );
});

/* Serving */
self.addEventListener('fetch', function(e){
  var p = caches.match(e.request);
  var c = p.then(function(response){
    if(response){
      console.log(response);
      return response;
    }
    return fetch(e.request);
  });
  e.respondWith(c);
});
