import PageHome from './pages/home.js';
import PageSignIn from './pages/signin.js';
import PageSignUp from './pages/signup.js';

// Это просто список всех путей с присущими им свойствами и методами
const routes = [
    {
        path: /^\/home/,
        title: 'ДОСТОПРИМЕЧАТЕЛЬНОСТИ',
        html: PageHome.html,
        mount: PageHome.mount,
        unmount: PageHome.unmount,
        cssPath: 'src/styles/index.css',
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
    }
];

export default routes;