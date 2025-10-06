'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';

const RESOURCES = {"assets/AssetManifest.bin": "2b2b7aee0cfa410d600d93e3459dd1fe",
"assets/AssetManifest.bin.json": "a3c9a1f5224589da5cd06b534d674be4",
"assets/AssetManifest.json": "95dbee9af40977eb9b9945fbc4fd9cb9",
"assets/assets/icon/convertir.png": "d1123a29e35cd026ab12bf718f8e8730",
"assets/assets/icon/convertir2.png": "dda25cd022a8c540283c09b17298a2b7",
"assets/assets/icon/desarrollo-web.png": "0051d0752b58d790403f81a53b5006df",
"assets/assets/icon/descarga.png": "f3783c225f18fe1396473f706473a964",
"assets/assets/icon/flutter.png": "6637b6c64481c76692760d0729b9c10a",
"assets/assets/icon/icono.png": "c82b0f7e049003fb07e0e0c1aad52d14",
"assets/assets/icon/ImageConverter.png": "4a6b25f896afb38a0bab90b6e584ab19",
"assets/assets/icon/java%2520(1).png": "e7868999b5fff273a1342a96c21cce09",
"assets/assets/icon/java.png": "74e943d82452f81f6a0bb0b51ac6785d",
"assets/assets/icon/java_1.png": "a3515672a5d44ab93c2551528efd0778",
"assets/assets/icon/java_2.png": "960e37ea61c3c8ea21ce5e6100a6bc96",
"assets/assets/icon/kotlin.png": "a7388fc60a26cfbeda5adf05dd318cc2",
"assets/assets/icon/programacion.png": "eb60481fb6f810b37810587ba06c84fd",
"assets/assets/icon/programacion2.png": "d1281840dfd2a843bdd8a20ac7521afc",
"assets/assets/icon/programacion3.png": "e909d256b54b5b6b1215bb073829af22",
"assets/assets/imagenes/1.png": "77e3c4e7f60cfea69b1714b0b9b5f3ec",
"assets/assets/imagenes/1_fondo_tomate.png": "7c57eecd9a31cb0ac48e86ec1a609c3b",
"assets/assets/imagenes/1_sin_fondo.png": "9da5666fbede50af67bef2d20f1f63b2",
"assets/assets/imagenes/2.png": "5d1818c0aecc8befab1ab5fdc0d67199",
"assets/assets/imagenes/2_fondo_tomate.png": "1fe95b638fec15dbef906f2e640823de",
"assets/assets/imagenes/2_sinfondo.png": "fdae0f370500b6927fc5e0d5279362de",
"assets/assets/pdf/cv.pdf": "121af9c1b35e83b67c32444a9f80444a",
"assets/assets/pdf/prueba.pdf": "b8a2a3cf1c35e65ccc3f4240ce7f74e9",
"assets/FontManifest.json": "c6b115e9ab2ac9308748c8767ca04429",
"assets/fonts/MaterialIcons-Regular.otf": "448fa817afa13c2a072551e4f55dbc61",
"assets/NOTICES": "795496467ec8f7ed8a48f18f8a092913",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "e986ebe42ef785b27164c36a9abc7818",
"assets/packages/social_media_buttons/fonts/SocialMediaIcons.ttf": "be271838cfb555093a41e12292acce83",
"assets/shaders/ink_sparkle.frag": "ecc85a2e95f5e9f53123dcaf8cb9b6ce",
"canvaskit/canvaskit.js": "66177750aff65a66cb07bb44b8c6422b",
"canvaskit/canvaskit.js.symbols": "48c83a2ce573d9692e8d970e288d75f7",
"canvaskit/canvaskit.wasm": "1f237a213d7370cf95f443d896176460",
"canvaskit/chromium/canvaskit.js": "671c6b4f8fcc199dcc551c7bb125f239",
"canvaskit/chromium/canvaskit.js.symbols": "a012ed99ccba193cf96bb2643003f6fc",
"canvaskit/chromium/canvaskit.wasm": "b1ac05b29c127d86df4bcfbf50dd902a",
"canvaskit/skwasm.js": "694fda5704053957c2594de355805228",
"canvaskit/skwasm.js.symbols": "262f4827a1317abb59d71d6c587a93e2",
"canvaskit/skwasm.wasm": "9f0c0c02b82a910d12ce0543ec130e60",
"canvaskit/skwasm.worker.js": "89990e8c92bcb123999aa81f7e203b1c",
"favicon.png": "5dc30d6cb3046e64797277aed2654ca2",
"flutter.js": "f393d3c16b631f36852323de8e583132",
"flutter_bootstrap.js": "9711ce825f25529a84febed0b8ac132a",
"icono.png": "c82b0f7e049003fb07e0e0c1aad52d14",
"icons/Icon-192.png": "56534d2e376b455868ea6530be4866ca",
"icons/Icon-512.png": "93fb3ded5281336c0cc309d1143fb379",
"icons/Icon-maskable-192.png": "56534d2e376b455868ea6530be4866ca",
"icons/Icon-maskable-512.png": "93fb3ded5281336c0cc309d1143fb379",
"index.html": "ae2b9b65d0d0821492880dc891747035",
"/": "ae2b9b65d0d0821492880dc891747035",
"main.dart.js": "d72a8adf44d4f765b64c13c0ace54a6c",
"manifest.json": "9dd22a7db61caeea1aceb34610ee1241",
"version.json": "711679ff19b309634bd50dfb162108cb"};
// The application shell files that are downloaded before a service worker can
// start.
const CORE = ["main.dart.js",
"index.html",
"flutter_bootstrap.js",
"assets/AssetManifest.bin.json",
"assets/FontManifest.json"];

// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});
// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        // Claim client to enable caching on first launch
        self.clients.claim();
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      // Claim client to enable caching on first launch
      self.clients.claim();
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});
// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache only if the resource was successfully fetched.
        return response || fetch(event.request).then((response) => {
          if (response && Boolean(response.ok)) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      })
    })
  );
});
self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});
// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}
// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
