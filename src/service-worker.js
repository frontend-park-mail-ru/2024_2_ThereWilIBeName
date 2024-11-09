// Загрузка сервис воркера с заменой предыдущего
self.addEventListener('install', (event) => {
    event.waitUntil(self.skipWaiting());
});

console.log('Service worker install');
const KEY = 'there-will-be-name';

// Добавление в кэш статики через postMessage, отправленной из основного приложения
self.addEventListener('message', async (event) => {
    console.log(event);
    if (event.data.type === 'CACHE_URLS') {
        try {
            const cache = await caches.open(KEY);
            cache.addAll(event.data.payload);
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
    event.respondWith( new Promise(async (resolve, reject) => {
        console.log(navigator.onLine);
        // Если онлайн, обновляем кэш
        if (navigator.onLine) {
            try {
                const res = await fetch(event.request);
                const resClone = res.clone();
                caches.open(KEY).then((cache) => cache.put(event.request, resClone));
            }
            catch (error) {
                reject(error);
                return;
            }
        }

        const cachedResponse = await caches.match(event.request);
        console.log(cachedResponse);
        // Если кэш есть, то его возвращаем
        if (cachedResponse) {
            resolve(cachedResponse);
            return;
        }

        // Если его нет, и мы оффлайн, то сервер не может приготовить кофе, потому что он чайник
        // const init = {
        //     status: 418,
        //     statusText: 'Offline Mode'
        // };
        // const data = { message: 'Ошибка, так как вы офлайн и кэша нет' };
        // const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        // resolve(new Response(blob, init));
    }))
});
