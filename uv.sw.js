importScripts('/cobalt/uv/uv.bundle.js');
importScripts('/cobalt/uv/uv.config.js');
importScripts(__uv$config.sw || '/cobalt/uv/uv.sw.js');

const uv = new UVServiceWorker();

self.addEventListener("fetch", (event) => {
  event.respondWith(
    (async () => {
      if (event.request.url.startsWith(location.origin + __uv$config.prefix)) {
        return await uv.fetch(event);
      }
      return await fetch(event.request);
    })()
  );
});


