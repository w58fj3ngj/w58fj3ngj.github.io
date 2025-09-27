// This file overwrites the stock UV config.js

self.__uv$config = {
  prefix: "/service/uv/",
  bare: "/bare/",
  encodeUrl: Ultraviolet.codec.xor.encode,
  decodeUrl: Ultraviolet.codec.xor.decode,
  handler: "/cobalt/uv/uv.handler.js",
  client: "/cobalt/uv/uv.client.js",
  bundle: "/cobalt/uv/uv.bundle.js",
  config: "/cobalt/uv/uv.config.js",
  sw: "/cobalt/uv/uv.sw.js",
};
