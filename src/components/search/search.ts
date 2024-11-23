import Router from '../../utils/Router';
import Api from '../../utils/Api';

// import searchButton from '../../static/search button.svg';
import searchCitiesTemplate from './searchCities.hbs';
import searchPlacesTemplate from './searchPlaces.hbs';
import Search from '../../utils/search-memory';
import debounce from '../debounce';
import CSAT from '../../utils/CSAT-memory';
import csat from '../csat-block';

export default {
    html: `
        <div class="search search-grid">
            <input type="text" placeholder="Здесь будет поиск" class="search-input" id="search-input">
            <ul class="search-results hidden" id="search-results">
                <ul class="search-results-cities" id="search-results-cities"></ul>
                <ul class="search-results-places" id="search-results-places"></ul>
            </ul>
        </div>
    `,

    async mount(router: Router): Promise<void> {
        const inputSearch = document.getElementById('search-input') as HTMLInputElement;
        const searchResultsCities = document.getElementById('search-results-cities') as HTMLElement;
        const searchResultsPlaces = document.getElementById('search-results-places') as HTMLElement;

        if (!inputSearch || !searchResultsCities || !searchResultsPlaces) return;

        // Функция поиска
        const search = async (query: string) => {
            // Очистим предыдущие результаты
            searchResultsCities.innerHTML = '';
            searchResultsPlaces.innerHTML = '';

            if (!query) return;

            try {
                const response = await Api.getSearch(query);

                const results = response.data;
                CSAT.searchActiveQ = true;
                csat.mount();
                for (const result of results) {
                    if (result.type === 'city') {
                        const city = {
                            name: result.name,
                            id: result.id,
                        };
                        searchResultsCities.insertAdjacentHTML('beforeend', searchCitiesTemplate({ city }));
                    }
                    if (result.type === 'place') {
                        const place = (await Api.getAttraction(result.id)).data;
                        searchResultsPlaces.insertAdjacentHTML('beforeend', searchPlacesTemplate({ place }));
                    }
                }

                searchResultsCities.addEventListener('click', (event) => {
                    const target = event.target as HTMLElement;
                    if (target) {
                        const listItem = target.closest('LI');
                        if (listItem) {
                            Search.cityId = Number(listItem.querySelector('city')!.textContent);
                            router.goto('/home');
                        }
                    }
                });
                searchResultsPlaces.addEventListener('click', (event) => {
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
                console.error('Ошибка:', error);
            }
        };

        // Применяем дебаунс к функции поиска
        const debouncedSearch = debounce(search, 300);

        const searchResults = document.getElementById('search-results') as HTMLElement;
        inputSearch.addEventListener('input', (event) => {
            searchResults.classList.add('hidden');
            const query = inputSearch.value.trim();
            if (query) {
                searchResults.classList.remove('hidden');
            }
            debouncedSearch(query);
        });
    }
};
