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
        let columnPlaces1 = [];
        let columnPlaces2 = [];
        let columnPlaces3 = [];

        for (let i = 0; i < attractions.length - 1; i++) {
            switch (i % 3) {
            case 0:
                columnPlaces1.push(attractions[i]);
                break;
            case 1:
                columnPlaces2.push(attractions[i]);
                break;
            case 2:
                columnPlaces3.push(attractions[i]);
                break;
            }
        }

        const column1 = document.getElementById('place-column-1') as HTMLElement;
        const column2 = document.getElementById('place-column-2') as HTMLElement;
        const column3 = document.getElementById('place-column-3') as HTMLElement;
        let finalResultAttractions = columnPlaces1;
        column1.innerHTML = galleryTemplate({ finalResultAttractions });
        finalResultAttractions = columnPlaces2;
        column2.innerHTML = galleryTemplate({ finalResultAttractions });
        finalResultAttractions = columnPlaces3;
        column3.innerHTML = galleryTemplate({ finalResultAttractions });

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
