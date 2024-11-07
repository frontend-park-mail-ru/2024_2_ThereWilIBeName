export type {};
declare const self: ServiceWorkerGlobalScope;

// Загрузка сервис воркера с заменой предыдущего
self.addEventListener('install', (event) => {
    event.waitUntil(self.skipWaiting());
});

const KEY = 'there-will-be-name';

// Добавление в кэш статики через postMessage, отправленной из основного приложения
self.addEventListener('message', async (event) => {
    if (event.data.type === 'CACHE_URLS') {
        try {
            const cache = await caches.open(KEY);
            event.waitUntil(cache.addAll(event.data.payload));
        }
        catch (error) {
            console.error(error);
        }
    }
});

self.addEventListener('fetch', async (event) => {
    if (event.request.method !== 'GET') {
        return;
    }

    // Если онлайн, обновляем кэш
    if (navigator.onLine) {
        try {
            const res = await fetch(event.request);
            const resClone = res.clone();
            caches.open(KEY).then((cache) => cache.put(event.request, resClone));
        }
        catch (error) {
            console.error(error);
        }
    }

    const cachedResponse = await caches.match(event.request);

    // Если кэш есть, то его возвращаем
    if (cachedResponse) {
        event.respondWith(cachedResponse);
        return;
    }

    // Если его нет, и мы оффлайн, то сервер не может приготовить кофе, потому что он чайник
    const init = {
        status: 418,
        statusText: 'Offline Mode'
    };
    const data = { message: 'Ошибка, так как вы офлайн и кэша нет' };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    event.respondWith(new Response(blob, init));
});
