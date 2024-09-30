import PageHome from './pages/home.js';
import PageSignIn from './pages/signin.js';
import PageSignUp from './pages/signup.js';
import Page404 from './pages/404.js';

/**
 * @typedef {Object} Route
 * @property {RegExp} path - Регулярное выражение, соответствующее пути URL.
 * @property {string} title - Название страницы, которое будет отображаться в заголовке вкладки браузера.
 * @property {function(): string} html - Функция, возвращающая HTML-контент, который будет вставлен на страницу.
 * @property {function(): void} mount - Функция, выполняемая при монтировании страницы.
 * @property {function(): void} unmount - Функция, выполняемая при размонтировании страницы.
 * @property {string} cssPath - Путь к файлу CSS-стилей, которые применяются к данной странице.
 */
/**
 * Это массив маршрутов для приложения.
 * Каждый объект в массиве описывает маршрут, включающий путь, заголовок страницы, HTML-контент,
 * функции монтирования и размонтирования, а также путь к соответствующему CSS-файлу.
 *
 * @type {Route[]}
 */
export default [
    {
        path: /^(|\/|\/home)$/,
        title: 'ДОСТОПРИМЕЧАТЕЛЬНОСТИ',
        html: PageHome.html,
        mount: PageHome.mount,
        unmount: PageHome.unmount,
        cssPath: '',
    },
    {
        path: /^\/signin/,
        title: 'АВТОРИЗАЦИЯ',
        html: PageSignIn.html,
        mount: PageSignIn.mount,
        unmount: PageSignIn.unmount,
        cssPath: 'src/styles/auth.css',
    },
    {
        path: /^\/signup/,
        title: 'РЕГИСТРАЦИЯ',
        html: PageSignUp.html,
        mount: PageSignUp.mount,
        unmount: PageSignUp.unmount,
        cssPath: 'src/styles/registration.css',
    },
    {
        path: /.*/,
        title: '404',
        html: Page404.html,
        mount: Page404.mount,
        unmount: Page404.unmount,
        cssPath: 'src/styles/404.css',
    },
];
