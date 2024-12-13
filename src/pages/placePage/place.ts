import Api from '../../utils/Api';
import Router from '../../utils/Router';
import header from '../../components/header';
import footer from '../../components/footer';
import mapMarkerIcon from '../../static/map marker.svg';
import backButton from '../../static/back button white.svg';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import reviewsLoad from './reviews-load';
import User from '../../utils/user';
import galleryCategoriesTemplate from './categories.hbs';

export default {
    html:
        `${header.html}
        <main>
            <div class="place-block">
                <div class="place-image grid-place-image">
                    <img src="img_1.png" alt="{{name}}" id="place-image">
                </div>
                <div class="place-name grid-place-name" id="place-name">Название</div>
                <div class="back-button-block grid-back-button">
                    <img class="back-button" src="${backButton}" id="back-button">
                </div>
                <div class="categories grid-categories" id="categories"></div>
                <div class="place-info grid-place-info">
                    <div class="description" id="description">Здесь будет описание</div>
                </div>
                <div class="map-container grid-map-container" id="map-container">
                    <div class="map-class" id="map"></div>
                </div>
                
                <div class="reviews grid-reviews">
                    <div class="review-form">
                        <div class="review-form-title grid-review-form-title">Были? Поделитесь!</div>
                        <div class="rating grid-rating">
                            <input class="rating-input" type="number" min="1" max="5" step="1" value="5" id="rating-input">из 5</div>
                        <textarea class="review-text-area grid-review-text-area" id="review-text-area" placeholder="Напишите ваши впечатления"></textarea>
                        <div class="review-form-button grid-review-form-button" id="review-form-button">Оставить отзыв</div>
                    </div>
                    <div class="reviews-gallery" id="reviews-gallery">
                    </div>
                </div>
            </div>
        </main>
        ${footer.html}
`,
    async mount(router: Router, params: any): Promise<void> {
        const backButton = document.getElementById('back-button') as HTMLButtonElement;
        backButton.addEventListener('click', () => {
            router.goto('/home');
        });

        // Монтирование хэдера
        await header.mount(router);

        const itemId: number = Number(params);
        const attractionResponse = await Api.getAttraction(itemId);
        const attraction = attractionResponse.data;

        const placeName = document.getElementById('place-name') as HTMLElement;
        placeName.textContent = attraction.name;
        const placeImage = document.getElementById('place-image') as HTMLImageElement;
        placeImage.src = attraction.imagePath;
        const placeDescription = document.getElementById('description') as HTMLElement;
        placeDescription.textContent = attraction.description;

        const categories = attraction.categories;
        const galleryCategories = document.getElementById('categories') as HTMLElement;

        galleryCategories.innerHTML = galleryCategoriesTemplate({ categories });

        const latitude = attraction.latitude;
        const longitude = attraction.longitude;
        const map = L.map('map', {attributionControl: false}).setView([latitude, longitude], 13);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
        const customIcon = L.icon({
            iconUrl: mapMarkerIcon,
            iconSize: [60, 60],
            popupAnchor: [0, -25], // Точка привязки всплывающего окна относительно иконки
        });
        L.marker([latitude, longitude], { icon: customIcon })
            .addTo(map)
            .bindPopup(`${attraction.name}`)
            .openPopup();

        const mapContainer = document.getElementById('map-container');
        if (mapContainer) {
            const resizeObserver = new ResizeObserver(() => {
                map.invalidateSize();
            });
            resizeObserver.observe(mapContainer);
        }

        const reviewFormButton = document.getElementById('review-form-button') as HTMLButtonElement;
        const reviewFormText = document.getElementById('review-text-area') as HTMLTextAreaElement;
        const formRatingInput = document.getElementById('rating-input') as HTMLInputElement;
        reviewFormButton.addEventListener('click', async () => {
            if (!reviewFormText.value) {
                return;
            }
            if (Number(formRatingInput.value) < 1 || Number(formRatingInput.value) > 5) {
                alert('Некорректный рейтинг');
                return;
            }
            const res = await Api.postReview(Number(User.id), itemId, reviewFormText.value, Number(formRatingInput.value));
            if (!res.ok) {
                console.log('Ошибка отправки отзыва');
            }
            await reviewsLoad(itemId, router);
        });

        await reviewsLoad(itemId, router);
    },

    unmount(): void {}
};
