import { Route } from '../routes';

/**
 * Класс `Router` управляет навигацией по приложению с использованием истории браузера
 * и монтированием/размонтированием страниц в зависимости от текущего URL.
 */
export default class Router {
    /**
     * Корневой элемент, в который рендерятся страницы.
     * @type {HTMLElement}
     * @private
     */
    private rootElement: HTMLElement = document.body;

    /**
     * Массив маршрутов, определяющих отображаемые страницы.
     * @type {Route[]}
     * @private
     */
    private routes: Route[] = [];

    /**
     * Текущая активная страница.
     * @type {Route | null}
     * @private
     */
    private currentPage: Route | null = null;

    /**
     * Последний добавленный CSS-класс для страницы.
     * @type {string}
     * @private
     */
    private lastCssClass: string = '';

    /**
     * Создает экземпляр роутера.
     *
     * @param {Route[]} routes - Массив объектов маршрутов, которые определяют, какие страницы показывать для каких путей.
     * @param {string} [rootElementId] - Опциональный ID корневого элемента, куда будут рендериться страницы.
     * Если не указан, используется `document.body`.
     */
    constructor(routes: Route[], rootElementId?: string) {
        this.rootElement = rootElementId ? document.getElementById(rootElementId) as HTMLElement : document.body;
        this.routes = routes;
        const rootPath = location.pathname;
        this.goto(rootPath);
        window.addEventListener('popstate', () => {
            this.goto(location.pathname, false);
        });
    }

    /**
     * Приватная функция ожидания полной загрузки страницы.
     * Использует `requestAnimationFrame` для определения момента, когда браузер завершит
     * отрисовку предыдущих изменений и будет готов к следующим.
     *
     * @returns {Promise<void>} Промис, который выполняется, когда страница готова к дальнейшим действиям.
     * @private
     */
    #waitForPageLoad(): Promise<void> {
        return new Promise(resolve => {
            requestAnimationFrame(() => resolve());
        });
    }

    /**
     * Переходит по заданному URL, размонтирует текущую страницу и монтирует новую.
     * Также обновляет заголовок страницы, URL и применяет CSS-класс.
     *
     * @param {string} url - URL, на который нужно перейти.
     * @param {boolean} [withPushState=true] - Флаг, указывающий, нужно ли обновлять состояние истории браузера.
     * @returns {Promise<void>} Промис, который выполняется, когда страница завершила монтирование.
     * @throws {TypeError} Если URL не соответствует ни одному маршруту.
     */
    async goto(url: string, withPushState = true): Promise<void> {
        if (this.currentPage) {
            this.currentPage.unmount();
        }

        // Отрисовка страницы
        const page = this.routes.find(route => route.path.test(url));
        if (!page) {
            throw TypeError('Unknown URL');
        }

        this.rootElement.classList.add('hidden');
        await new Promise(resolve => setTimeout(resolve, 200));
        this.rootElement.classList.remove('hidden');
        this.rootElement.innerHTML = page.html;
        await this.#waitForPageLoad();
        page.mount(this);
        this.currentPage = page;

        // Обновление заголовка и URL
        document.title = page.title;
        const newUrl = location.origin + url;

        if (withPushState) {
            history.pushState(null, '', newUrl);
        }

        // Изменение CSS-класса
        if (this.lastCssClass === '') {
            this.rootElement.classList.add(page.cssClass);
        } else {
            this.rootElement.classList.replace(this.lastCssClass, page.cssClass);
        }
        this.lastCssClass = page.cssClass;
    }
}
