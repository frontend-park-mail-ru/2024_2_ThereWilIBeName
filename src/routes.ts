import PageHome from './pages/homePage/home';
import PageSignIn from './pages/signin';
import PageSignUp from './pages/signup';
import Page404 from './pages/404';
import PageProfile from './pages/profilePage/profile';
import PageTrips from './pages/tripsPage/trips';
import PagePLace from './pages/placePage/place';
import PageCreateTrip from './pages/create-trip';
import PageChangePassword from './pages/change-password';
import PageEditTrip from './pages/edit-trip';
import PageHello from './pages/hello';
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
    mount(router: Router, params: any): Promise<void>;
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
        path: /^\/hello/,
        title: 'Начальная страница',
        html: PageHello.html,
        mount: PageHello.mount,
        unmount: PageHello.unmount,
        cssClass: 'hello-page',
    },
    {
        path: /^(|\/|\/home)$/,
        title: 'Домашнаяя страница',
        html: PageHome.html,
        mount: PageHome.mount,
        unmount: PageHome.unmount,
        cssClass: 'home-page',
    },
    {
        path: /^\/profile/,
        title: 'Профиль',
        html: PageProfile.html,
        mount: PageProfile.mount,
        unmount: PageProfile.unmount,
        cssClass: 'profile-page',
    },
    {
        path: /^\/signin/,
        title: 'Авторизация',
        html: PageSignIn.html,
        mount: PageSignIn.mount,
        unmount: PageSignIn.unmount,
        cssClass: 'auth-page',
    },
    {
        path: /^\/signup/,
        title: 'Регистрация',
        html: PageSignUp.html,
        mount: PageSignUp.mount,
        unmount: PageSignUp.unmount,
        cssClass: 'registration-page',
    },
    {
        path: /^\/trips/,
        title: 'Поездки',
        html: PageTrips.html,
        mount: PageTrips.mount,
        unmount: PageTrips.unmount,
        cssClass: 'trips-page',
    },
    {
        path: /^\/createtrip/,
        title: 'Создание поездки',
        html: PageCreateTrip.html,
        mount: PageCreateTrip.mount,
        unmount: PageCreateTrip.unmount,
        cssClass: 'create-trip-page',
    },
    {
        path: /^\/edittrip/,
        title: 'Редактирование поездки',
        html: PageEditTrip.html,
        mount: PageEditTrip.mount,
        unmount: PageEditTrip.unmount,
        cssClass: 'create-trip-page',
    },
    {
        path: /^\/changepassword/,
        title: 'Смена пароля',
        html: PageChangePassword.html,
        mount: PageChangePassword.mount,
        unmount: PageChangePassword.unmount,
        cssClass: 'change-password-page',
    },
    {
        path: /^\/places\/(\d+)$/,
        title: 'Страница достопримечательности',
        html: PagePLace.html,
        mount: PagePLace.mount,
        unmount: PagePLace.unmount,
        cssClass: 'place-page',
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
