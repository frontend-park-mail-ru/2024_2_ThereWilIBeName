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

        // Дополняем массив до кратности 3
        while (attractions.length % columns !== 0) {
            attractions.push({
                address: '',
                categories: [],
                city: '',
                description: '',
                imagePath: '',
                latitude: 0,
                longitude: 0,
                name: '',
                phoneNumber: '',
                rating: 0,
                id: '-1'
            }); // добавляем объект-маркер
        }

        for (let i = 0; i < attractions.length / columns; i++) {
            const row = [];
            for (let j = i; j < attractions.length; j += attractions.length / columns) {
                row.push(attractions[j]);
            }
            for (let j = 0; j < row.length; j++) {
                columnsResult.push(row[j]);
            }
        }

        const finalResultAttractions = columnsResult.filter(attraction => attraction.id !== '-1');

        console.log(finalResultAttractions);

        const galleryElement = document.getElementById('gallery') as HTMLElement;
        galleryElement.innerHTML = galleryTemplate({ finalResultAttractions });

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
