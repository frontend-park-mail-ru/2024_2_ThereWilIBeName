
// Роутер, с помощью которого мы путешествуем по миру ссылок
export default class Router {
    rootElement = document.body;
    routes = null;
    currentPage = null;
    rootURL = null;

    // Конструктор роутера, в который мы передаём ВСЕ ПУТИ и КОРНЕВОЙ ЭЛЕМЕНТ,
    // относительно которого нужно рисовать
    constructor(routes, rootElementId = undefined) {
        if (rootElementId) {
            this.rootElement = document.getElementById(rootElementId);
        }
        this.routes = routes;

        this.rootPath = window.location.pathname;
        console.log(this.rootPath);

        this.rootURL = window.location.origin + window.location.pathname;

        this.goto('/home');
    }

    /* Интересная функция, с помощью которой мы ждём, пока всё прогрузится.
       Ключевая особенность - функция requestAnimationFrame. Эта функция говорит нам о том,
       что браузер готов отрисовывать что-то новое, потому что он закончил отрисовывать
       предыдущие изменения в HTML. Это мы и используем для ожидания отрисовки интересующих нас
       элементов, чтобы навесить на них eventListener.
    */
    #waitForPageLoad() {
        return new Promise(resolve => {
            requestAnimationFrame(() => resolve());
        });
    }

    // Функция перехода по заданному url
    async goto(url) {
        if (this.currentPage) {
            this.currentPage.unmount();
        }
        const page = this.routes.find(route => route.path.test(url));
        this.rootElement.innerHTML = page.html;
        await this.#waitForPageLoad();
        page.mount(this);
        this.currentPage = page;

        document.getElementById('css-file').href = page.cssPath;
        document.title = page.title;
        const newUrl = this.rootURL.slice(0,-1) + url;
        history.pushState(null, null, newUrl);

    }
}
