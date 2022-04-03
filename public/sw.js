const CACHE_NAME = 'recv1'
const FILES = ['/index.html']

const log = (str) =>
  console.log(
    '%c[Service Worker] ' + `%c${str}`,
    'color: gold;',
    'color: white;'
  )

// Intercept all fetch events.
self.addEventListener('fetch', (e) => {
  // let event = e as FetchEvent
  // And respond with our own data.
  e.respondWith(
    (async () => {
      const r = await caches.match(e.request)
      if (r) {
        log(`Resource found in cache:`)
        console.log(e.request.url)
        return r
      }
      log(`Fetching resource:`)
      console.log(e.request.url)
      const response = await fetch(e.request)
      const cache = await caches.open(CACHE_NAME)
      log(`Caching new resource:`)
      console.log(e.request.url)
      cache.put(e.request, response.clone())
      return response
    })()
  )
})
