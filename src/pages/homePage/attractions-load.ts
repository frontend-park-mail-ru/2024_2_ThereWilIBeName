import Api from '../../utils/Api';
import Router from '../../utils/Router';
import Search from '../../utils/search-memory';
import galleryTemplate from './home.hbs';

export default async function attractionsLoad(placeGallery: HTMLButtonElement, router: Router) {
    try {
        // Загрузка достопримечательностей
        const attractionsResponse = await Api.getAttractions(Search.limit, Search.offset, Search.cityId, Search.categoryId, Search.filterId);
        const attractions = attractionsResponse.data;

        // Логика построчного разбиения на три колонки
        const columns = 3;
        const columnsResult = [];

        for (let i = 0; i < attractions.length / columns; i++) {
            const row = [];
            for (let j = 0; j < attractions.length; j += attractions.length / columns) {
                row.push(attractions[j]);
            }
            columnsResult.push(row);
        }

        console.log(columnsResult);

        const galleryElement = document.getElementById('gallery') as HTMLElement;
        galleryElement.innerHTML = galleryTemplate({ columnsResult });

        placeGallery.addEventListener('click', (event) => {
            const target = event.target as HTMLElement;
            if (target) {
                const listItem = target.closest('LI');
                if (listItem) {
                    const itemId = listItem.querySelector('a')!.href.split('/').pop();
                    router.goto(`/places/${itemId}`);
                }
            }
        });
    } catch (error) {
        console.log('Ошибка загрузки мест');
    }
};
