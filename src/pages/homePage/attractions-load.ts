import Api from '../../utils/Api';
import Router from '../../utils/Router';
import Search from '../../utils/search-memory';
import galleryTemplate from './home.hbs';

export default async function attractionsLoad(placeButton: HTMLButtonElement, router: Router) {
    try {
        // Загрузка достопримечательностей
        const attractionsResponse = await Api.getAttractions(Search.limit, Search.offset, Search.cityId, Search.categoryId);
        const attractions = attractionsResponse.data;
        const galleryElement = document.getElementById('gallery') as HTMLElement;
        galleryElement.innerHTML = galleryTemplate({ attractions });

        placeButton.addEventListener('click', (event) => {
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