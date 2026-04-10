const CACHE_NAME = 'bardiuzhenko-v2'

self.addEventListener('install', () => {
  self.skipWaiting()
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  )
})

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return

  const { pathname } = new URL(event.request.url)

  // Cache-first for hashed Next.js static assets — safe because URLs change on each deploy
  if (pathname.startsWith('/_next/static/')) {
    event.respondWith(
      caches.match(event.request).then(
        (cached) => cached ?? fetch(event.request).then((res) => {
          if (res.ok) caches.open(CACHE_NAME).then((c) => c.put(event.request, res.clone()))
          return res
        })
      )
    )
    return
  }

  // Network-first for everything else (HTML, images) — always fresh, falls back to cache offline
  event.respondWith(
    fetch(event.request)
      .then((res) => {
        if (res.ok && pathname.match(/icon.*\.png$/)) {
          caches.open(CACHE_NAME).then((c) => c.put(event.request, res.clone()))
        }
        return res
      })
      .catch(() => caches.match(event.request))
  )
})
