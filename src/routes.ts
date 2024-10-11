import PageHome from './pages/home.js';
import PageSignIn from './pages/signin.js';
import PageSignUp from './pages/signup.js';
import Page404 from './pages/404.js';
import Router from './utils/Router.js'

export interface Route {
    path: RegExp;
    title: string;
    html: string;
    mount: (router: Router) => Promise<void>;
    unmount: () => void;
    cssPath: string;
}

/**
 * Массив маршрутов для приложения.
 * Каждый объект описывает маршрут, включающий путь, заголовок страницы, HTML-контент,
 * функции монтирования и размонтирования, а также путь к соответствующему CSS-файлу.
 */
const routes: Route[] = [
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

export default routes;
