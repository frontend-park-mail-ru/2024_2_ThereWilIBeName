// Загрузка сервис воркера с заменой предыдущего
self.addEventListener('install', (event) => {
    event.waitUntil(self.skipWaiting());
});

console.log('Service worker install');
const KEY = 'there-will-be-name';

// Добавление в кэш статики через postMessage, отправленной из основного приложения
self.addEventListener('message', async (event) => {
    if (event.data.type === 'CACHE_URLS') {
        if (!event.data.payload || !Array.isArray(event.data.payload)) {
            console.error('Некорректное сообщение для кэширования');
            return;
        }
        try {
            const cache = await caches.open(KEY);
            await cache.addAll(event.data.payload);
            console.log('Ресурсы добавлены в кэш:', event.data.payload);
        } catch (error) {
            console.error('Ошибка кэширования:', error);
        }
    }
});

self.addEventListener('fetch', (event) => {
    if (event.request.method !== 'GET') return;

    event.respondWith(
        (async () => {
            try {
                const response = await fetch(event.request);
                if (response.ok) {
                    const cache = await caches.open(KEY);
                    cache.put(event.request, response.clone());
                }
                return response;
            } catch {
                const cachedResponse = await caches.match(event.request);
                return cachedResponse || new Response(
                    JSON.stringify({ message: 'Ошибка, вы оффлайн и кэша нет' }),
                    { status: 418, headers: { 'Content-Type': 'application/json' } }
                );
            }
        })()
    );
});