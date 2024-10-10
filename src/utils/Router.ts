import { Route } from '../routes';

/**
 * Класс Router управляет навигацией по приложению с использованием истории браузера и
 * монтированием/размонтированием страниц в зависимости от URL.
 */
export default class Router {
    private rootElement: HTMLElement = document.body;
    private routes: Route[] = [];
    private currentPage: Route | null = null;

    /**
     * Создает экземпляр роутера.
     *
     * @param {Route[]} routes - Массив объектов маршрутов, которые определяют, какие страницы показывать для каких путей.
     * @param {string} [rootElementId] - Опциональный ID корневого элемента, куда будут рендериться страницы. По умолчанию используется `document.body`.
     */
    constructor(routes: Route[], rootElementId?: string) {
        this.rootElement = rootElementId ? document.getElementById(rootElementId) as HTMLElement : document.body;
        this.routes = routes;

        const rootPath = location.pathname;
        this.goto(rootPath);
    }

    /**
     * Приватная функция ожидания полной загрузки страницы.
     * Использует requestAnimationFrame для определения момента, когда браузер завершит
     * отрисовку предыдущих изменений и будет готов к следующим.
     *
     * @returns {Promise<void>} Промис, который выполняется, когда страница готова к дальнейшим действиям.
     */
    #waitForPageLoad(): Promise<void> {
        return new Promise(resolve => {
            requestAnimationFrame(() => resolve());
        });
    }

    /**
     * Переходит по заданному URL, размонтирует текущую страницу и монтирует новую.
     * Также обновляет заголовок страницы, URL и путь к файлу CSS.
     *
     * @param {string} url - URL, на который нужно перейти.
     * @returns {Promise<void>} Промис, который выполняется, когда страница завершила монтирование.
     * @throws {TypeError} Если URL не соответствует ни одному маршруту.
     */
    async goto(url: string): Promise<void> {
        if (this.currentPage) {
            this.currentPage.unmount();
        }
        // Отрисовка страницы
        const page = this.routes.find(route => route.path.test(url));
        if (!page) {
            throw TypeError('Unknown URL');
        }
        this.rootElement.innerHTML = page.html;
        await this.#waitForPageLoad();
        page.mount(this);
        this.currentPage = page;

        // Изменение url
        const cssFileElement = document.getElementById('css-file') as HTMLLinkElement;
        cssFileElement.href = page.cssPath;
        document.title = page.title;
        const newUrl = location.origin + url;
        history.pushState(null, '', newUrl);
    }
}
