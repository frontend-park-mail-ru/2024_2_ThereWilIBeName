import routes from './routes';
import Router from './utils/Router';
import './styles/index.styl';

const router: Router = new Router(routes, 'root');
//
// if ('serviceWorker' in navigator) {
//     (async () => {
//         try {
//             const reg = await navigator.serviceWorker.register('/service-worker.js', { scope: '/' });
//             console.log('Регистрация прошла успешно. Область видимости запросов: ' + reg.scope);
//             const data = {
//                 type: 'CACHE_URLS',
//                 payload: [
//                     location.href,
//                     ...performance.getEntriesByType('resource').map(({ name }) => name)
//                 ]
//             };
//             const { installing, waiting, active } = reg;
//             if (installing) {
//                 console.log('Service worker installing');
//             } else if (waiting) {
//                 console.log('Service worker installed');
//             } else if (active) {
//                 active.postMessage(data);
//                 console.log('Service worker active');
//             }
//         }
//         catch(error) {
//             console.log('Регистрация не произведена. ' + error);
//         }
//     })();
// }
