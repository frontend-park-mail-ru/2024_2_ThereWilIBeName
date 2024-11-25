import Router from '../../utils/Router';
import header from '../../components/header';
import footer from '../../components/footer';
import Search from '../../utils/search-memory';
import csat from '../../components/csat-block';
import CSAT from '../../utils/CSAT-memory';
import closeIcon from '../../static/close icon.svg';
import attractionsLoad from './attractions-load';

export default {
    /**
     * HTML-шаблон главной страницы, отображающей заголовок, меню пользователя и галерею достопримечательностей.
     *
     * @type {string}
     */
    html: ` ${header.html}
        <main>
            <div class="gallery-block">
                <div class="headline">Интересные места</div>
                <hr>
                <div class="categories">
                    <div class="category" id="category-one">Исторические памятники</div>
                    <div class="category" id="category-two">Соборы</div>
                    <div class="category" id="category-three">Театры</div>
                    <div class="category" id="category-four">Музеи</div>
                    <div class="category" id="category-five">Мечети</div>
                    <div class="category" id="category-six">Крепости</div>
                    <div class="category" id="category-seven">Храмы</div>
                    <img src="${closeIcon}" class="category" id="category-none">
                </div>
                <ul class="gallery" id="gallery"></ul>
            </div>
        </main>
        ${footer.html}
<!--        ${csat.html}-->
    `,

    /**
     * Функция монтирования главной страницы.
     * Устанавливает обработчики событий для кнопок, загружает достопримечательности и информацию о текущем пользователе.
     *
     * @async
     * @param {Router} router - Экземпляр класса Router для управления навигацией между страницами.
     * @returns {Promise<void>} Промис, который выполняется после завершения монтирования страницы.
     */
    async mount(router: Router): Promise<void> {
        const placeButton = document.getElementById('gallery') as HTMLButtonElement;

        const categoryOneButton = document.getElementById('category-one') as HTMLButtonElement;
        categoryOneButton.addEventListener('click', async () => {
            Search.categoryId = 1;
            await attractionsLoad(placeButton, router);
        });
        const categoryTwoButton = document.getElementById('category-two') as HTMLButtonElement;
        categoryTwoButton.addEventListener('click', async () => {
            Search.categoryId = 2;
            await attractionsLoad(placeButton, router);
        });
        const categoryThreeButton = document.getElementById('category-three') as HTMLButtonElement;
        categoryThreeButton.addEventListener('click', async () => {
            Search.categoryId = 3;
            await attractionsLoad(placeButton, router);
        });
        const categoryFourButton = document.getElementById('category-four') as HTMLButtonElement;
        categoryFourButton.addEventListener('click', async () => {
            Search.categoryId = 4;
            await attractionsLoad(placeButton, router);
        });
        const categoryFiveButton = document.getElementById('category-five') as HTMLButtonElement;
        categoryFiveButton.addEventListener('click', async () => {
            Search.categoryId = 5;
            await attractionsLoad(placeButton, router);
        });
        const categorySixButton = document.getElementById('category-six') as HTMLButtonElement;
        categorySixButton.addEventListener('click', async () => {
            Search.categoryId = 6;
            await attractionsLoad(placeButton, router);
        });
        const categorySevenButton = document.getElementById('category-seven') as HTMLButtonElement;
        categorySevenButton.addEventListener('click', async () => {
            Search.categoryId = 7;
            await attractionsLoad(placeButton, router);
        });
        const categoryNoneButton = document.getElementById('category-none') as HTMLButtonElement;
        categoryNoneButton.addEventListener('click', async () => {
            Search.categoryId = -1;
            await attractionsLoad(placeButton, router);
        });

        // Монтирование хэдера
        await header.mount(router);

        // Загрузка мест
        await attractionsLoad(placeButton, router);

        // CSAT.homeActiveQ = true;
        // await csat.mount();

    },

    /**
     * Функция размонтирования главной страницы.
     * Используется для очистки состояния или удаления обработчиков событий при переходе на другую страницу.
     */
    unmount() {
        CSAT.homeActiveQ = false;
    },
};
