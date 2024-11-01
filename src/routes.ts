import PageHome from './pages/homePage/home';
import PageSignIn from './pages/signin';
import PageSignUp from './pages/signup';
import Page404 from './pages/404';
import PageProfile from './pages/profile';
import Router from './utils/Router';

/**
 * Интерфейс, описывающий структуру маршрута в приложении.
 * @interface Route
 * @property {RegExp} path - Регулярное выражение для сопоставления с URL.
 * @property {string} title - Заголовок страницы.
 * @property {string} html - HTML-содержимое страницы.
 * @property {(router: Router) => Promise<void>} mount - Функция, которая монтирует компонент страницы.
 * @property {() => void} unmount - Функция, которая размонтирует компонент страницы.
 * @property {string} cssClass - CSS-класс, применяемый к странице.
 */
export interface Route {
    path: RegExp;
    title: string;
    html: string;
    mount: (router: Router) => Promise<void>;
    unmount: () => void;
    cssClass: string;
}

/**
 * Массив маршрутов для приложения.
 * Каждый маршрут включает путь, заголовок страницы, HTML-содержимое,
 * функции монтирования и размонтирования, а также соответствующий CSS-класс.
 * @type {Route[]}
 */
const routes: Route[] = [
    {
        path: /^(|\/|\/home)$/,
        title: 'ДОСТОПРИМЕЧАТЕЛЬНОСТИ',
        html: PageHome.html,
        mount: PageHome.mount,
        unmount: PageHome.unmount,
        cssClass: 'home-page',
    },
    {
        path: /^(|\/|\/profile)$/,
        title: 'ПРОФИЛЬ',
        html: PageProfile.html,
        mount: PageProfile.mount,
        unmount: PageProfile.unmount,
        cssClass: 'profile-page',
    },
    {
        path: /^\/signin/,
        title: 'АВТОРИЗАЦИЯ',
        html: PageSignIn.html,
        mount: PageSignIn.mount,
        unmount: PageSignIn.unmount,
        cssClass: 'auth-page',
    },
    {
        path: /^\/signup/,
        title: 'РЕГИСТРАЦИЯ',
        html: PageSignUp.html,
        mount: PageSignUp.mount,
        unmount: PageSignUp.unmount,
        cssClass: 'registration-page',
    },
    {
        path: /.*/,
        title: '404',
        html: Page404.html,
        mount: Page404.mount,
        unmount: Page404.unmount,
        cssClass: 'unknown-page',
    },
];

export default routes;
