const CACHE_STATIC = 'bardiuzhenko-static-v2'
const CACHE_IMAGES = 'bardiuzhenko-images-v2'

self.addEventListener('install', () => {
  self.skipWaiting()
})

self.addEventListener('activate', (event) => {
  const keep = [CACHE_STATIC, CACHE_IMAGES]
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => !keep.includes(k)).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  )
})

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return

  const url = new URL(event.request.url)
  const { pathname } = url

  // ── 1. Next.js hashed static assets (JS/CSS) — cache-first forever ──────────
  if (pathname.startsWith('/_next/static/')) {
    event.respondWith(
      caches.match(event.request).then(
        (cached) => cached ?? fetch(event.request).then((res) => {
          if (res.ok) caches.open(CACHE_STATIC).then((c) => c.put(event.request, res.clone()))
          return res
        })
      )
    )
    return
  }

  // ── 2. Optimized images via Next.js image endpoint /_next/image ──────────────
  //    Also cache PWA icons and hero image from public/
  if (pathname.startsWith('/_next/image') || pathname.match(/\.(png|jpg|jpeg|webp|avif|svg|ico)$/)) {
    event.respondWith(
      caches.match(event.request).then((cached) => {
        // Stale-while-revalidate: return cache immediately, refresh in background
        if (cached) {
          fetch(event.request).then((res) => {
            if (res.ok) caches.open(CACHE_IMAGES).then((c) => c.put(event.request, res.clone()))
          }).catch(() => {})
          return cached
        }
        return fetch(event.request).then((res) => {
          if (res.ok) caches.open(CACHE_IMAGES).then((c) => c.put(event.request, res.clone()))
          return res
        })
      })
    )
    return
  }

  // ── 3. API calls — never cache, always network ───────────────────────────────
  if (url.hostname === '37.46.130.153') return

  // ── 4. HTML navigation — network-first, fallback to cache offline ─────────────
  event.respondWith(
    fetch(event.request)
      .catch(() => caches.match(event.request))
  )
})
