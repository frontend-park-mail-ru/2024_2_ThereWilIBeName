
// Роутер, с помощью которого мы путешествуем по миру ссылок
export default class Router {
    rootElement = document.body;
    routes = [];
    currentPage = null;

    // Конструктор роутера, в который мы передаём ВСЕ ПУТИ и КОРНЕВОЙ ЭЛЕМЕНТ,
    // относительно которого нужно рисовать
    constructor(routes, rootElementId = undefined) {
        if (rootElementId) {
            this.rootElement = document.getElementById(rootElementId);
        }
        this.routes = routes;

        const rootPath = location.pathname;

        this.goto(rootPath);
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
        //Отрисовка страницы
        const page = this.routes.find(route => route.path.test(url));
        if (!page) {
            throw TypeError('Unknown URL');
        }
        this.rootElement.innerHTML = page.html;
        await this.#waitForPageLoad();
        page.mount(this);
        this.currentPage = page;

        //Изменение url
        document.getElementById('css-file').href = page.cssPath;
        document.title = page.title;
        const newUrl = location.origin + url;
        history.pushState(null, null, newUrl);

    }
}
