import Api from '../../utils/Api';
import User from '../../utils/user';
import Router from '../../utils/Router';
import galleryTemplate from './home.hbs';
import header from '../../components/header';
import footer from '../../components/footer';

import logoImage from '../../static/logo.png';

export default {
    /**
     * HTML-шаблон главной страницы, отображающей заголовок, меню пользователя и галерею достопримечательностей.
     *
     * @type {string}
     */
    html: ` ${header.html}
        <main>
            <div class="headline">Достопримечательности</div>
            <hr>
            <ul class="gallery" id="gallery"></ul>
        </main>
        ${footer.html}
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

        // Монтирование хэдера
        await header.mount(router);

        // Загрузка достопримечательностей
        const attractionsResponse = await Api.getAttractions();
        const attractions = attractionsResponse.data;
        const galleryElement = document.getElementById('gallery') as HTMLElement;
        galleryElement.innerHTML = galleryTemplate({ attractions });


        placeButton.addEventListener('click', (event) => {
            const target = event.target as HTMLElement;
            if (target) {
                const listItem = target.closest('li');
                if (listItem) {
                    const itemId = listItem.querySelector('a')!.href.split('/').pop();
                    router.goto(`/places/${itemId}`);
                }
            }
        });
    },

    /**
     * Функция размонтирования главной страницы.
     * Используется для очистки состояния или удаления обработчиков событий при переходе на другую страницу.
     */
    unmount() {
        // Оставлено пустым, так как текущая реализация не требует очистки обработчиков.
    },
};
