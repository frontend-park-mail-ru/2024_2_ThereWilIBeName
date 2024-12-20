import Router from '../../utils/Router';
import Api from '../../utils/Api';
// import searchButton from '../../static/search button.svg';
import searchCitiesTemplate from './searchCities.hbs';
import searchPlacesTemplate from './searchPlaces.hbs';
import searchCitiesFirstTemplate from './searchCitiesFirst.hbs';
import searchPlacesFirstTemplate from './searchPlacesFirst.hbs';
import Search from '../../utils/search-memory';
import debounce from '../debounce';

export default {
    html: `
        <div class="search search-grid">
            <input type="text" placeholder="Поиск" class="search-input" id="search-input">
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
        let resultCount: number = 0 ;

        if (!inputSearch || !searchResultsCities || !searchResultsPlaces) return;

        // Функция поиска
        const search = async (query: string) => {
            // Очистим предыдущие результаты
            searchResultsCities.innerHTML = '';
            searchResultsPlaces.innerHTML = '';
            resultCount = 0;

            if (!query) return;

            try {
                const response = await Api.getSearch(query);

                const results = response.data;

                if (results.length === 0) {
                    searchResultsCities.innerHTML = '<div>Нет результатов</div>';
                }

                for (const result of results) {
                    resultCount++;
                    if (result.type === 'city') {
                        const city = {
                            name: result.name,
                            id: result.id,
                        };
                        if (resultCount === 1) {
                            searchResultsCities.insertAdjacentHTML('beforeend', searchCitiesFirstTemplate({ city }));
                        } else {
                            searchResultsCities.insertAdjacentHTML('beforeend', searchCitiesTemplate({ city }));
                        }
                    }
                    if (result.type === 'place') {
                        const place = (await Api.getAttraction(result.id)).data;
                        if (resultCount === 1) {
                            searchResultsPlaces.insertAdjacentHTML('beforeend', searchPlacesFirstTemplate({ place }));
                        } else {
                            searchResultsPlaces.insertAdjacentHTML('beforeend', searchPlacesTemplate({ place }));
                        }
                    }
                }

                searchResultsCities.addEventListener('click', (event) => {
                    const target = event.target as HTMLElement;
                    if (target) {
                        const listItem = target.closest('LI');
                        if (listItem) {
                            Search.cityId = Number(listItem.querySelector('city')!.textContent);
                            inputSearch.removeEventListener('input', () => {
                                searchResults.classList.add('hidden');
                                const query = inputSearch.value.trim();
                                if (query) {
                                    searchResults.classList.remove('hidden');
                                }
                                debouncedSearch(query);
                            });
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
                            inputSearch.removeEventListener('input', () => {
                                searchResults.classList.add('hidden');
                                const query = inputSearch.value.trim();
                                if (query) {
                                    searchResults.classList.remove('hidden');
                                }
                                debouncedSearch(query);
                            });
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
        inputSearch.addEventListener('input', () => {
            searchResults.classList.add('hidden');
            const query = inputSearch.value.trim();
            if (query) {
                searchResults.classList.remove('hidden');
            }
            debouncedSearch(query);
        });
    }
};
