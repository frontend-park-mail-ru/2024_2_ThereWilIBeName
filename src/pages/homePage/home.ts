import Router from '../../utils/Router';
import header from '../../components/header';
import footer from '../../components/footer';
import Search from '../../utils/search-memory';
import csat from '../../components/csat-block';
import filtersIcon from '../../static/filters.svg';
import closeIcon from '../../static/close icon.svg';
import attractionsLoad from './attractions-load';
import categoryButtonMount from './categoryButtonMount';

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
                </div>
                <div class="filters">
                    <img class="filter-icon" src="${filtersIcon}" alt="фильтры">
                    <div class="filter" id="normal-filter">по умолчанию</div>
                    <div class="filter" id="rating-filter">по рейтингу</div>
                    <div class="filter" id="popularity-filter">по популярности</div>
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
            await categoryButtonMount(1, placeButton, router, categoryOneButton);
        });

        const categoryTwoButton = document.getElementById('category-two') as HTMLButtonElement;
        categoryTwoButton.addEventListener('click', async () => {
            await categoryButtonMount(2, placeButton, router, categoryTwoButton);
        });

        const categoryThreeButton = document.getElementById('category-three') as HTMLButtonElement;
        categoryThreeButton.addEventListener('click', async () => {
            await categoryButtonMount(3, placeButton, router, categoryThreeButton);
        });

        const categoryFourButton = document.getElementById('category-four') as HTMLButtonElement;
        categoryFourButton.addEventListener('click', async () => {
            await categoryButtonMount(4, placeButton, router, categoryFourButton);
        });

        const categoryFiveButton = document.getElementById('category-five') as HTMLButtonElement;
        categoryFiveButton.addEventListener('click', async () => {
            await categoryButtonMount(5, placeButton, router, categoryFiveButton);
        });

        const categorySixButton = document.getElementById('category-six') as HTMLButtonElement;
        categorySixButton.addEventListener('click', async () => {
            await categoryButtonMount(6, placeButton, router, categorySixButton);
        });

        const categorySevenButton = document.getElementById('category-seven') as HTMLButtonElement;
        categorySevenButton.addEventListener('click', async () => {
            await categoryButtonMount(7, placeButton, router, categorySevenButton);
        });

        // Монтирование хэдера
        await header.mount(router);

        // Загрузка мест
        await attractionsLoad(placeButton, router);

    },

    /**
     * Функция размонтирования главной страницы.
     * Используется для очистки состояния или удаления обработчиков событий при переходе на другую страницу.
     */
    unmount() {
        Search.categoryId = -1;
    },
};
