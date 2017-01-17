// @flow
const cacheName: string = 'cache-v1';
const urlsToCache: Array<string> = [
  '/',
  '/css/main.css',
  '/js/main.bundle.js',
  '/manifest.json'
];

/* Installation */
self.addEventListener('install', function(e){
  e.waitUntil(setupCache);
});

function setupCache(){
  caches.open(cacheName).then(function(cache){
    return cache.addAll(urlsToCache);
  });
}

/* Serving */
self.addEventListener('fetch', function(e){
  // Serve immediately from cache
  e.respondWith(fromCache(e.request));

  // Update resources from network
  e.waitUntil(update(e.request));
});

function fromCache(request){
  return caches.open(cacheName).then(function(cache){
    return caches.match(request).then(function(response){
      return response || fetch(request);
    });
  });
}

function update(request){
  return caches.open(cacheName).then(function(cache){
    return fetch(request).then(function(response){
      return cache.put(request, response);
    });
  });
}
