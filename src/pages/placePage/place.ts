import Api from '../../utils/Api';
import User from '../../utils/user';
import placeTemplate from './place.hbs';
import Router from '../../utils/Router';
import deleteIcon from '../../static/delete.png';
import header from '../../components/header';
import mapMarkerIcon from '../../static/map marker.svg';
import backButton from '../../static/back button white.svg';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

export default {
    html:
        `${header.html}
        <main>
            <div class="place-block">
                <div class="column1">
                    <div class="place-image">
                        <img src="img_1.png" alt="{{name}}" id="place-image">
                    </div>
                    <div class="leave-review" id="leave-review">
                        <div class="leave-review-header">
                            <div class="leave-review-header-text">Напишите отзыв</div>
                            <div class="stars">
                                <span class="star" data-value="1">&#9733;</span>
                                <span class="star" data-value="2">&#9733;</span>
                                <span class="star" data-value="3">&#9733;</span>
                                <span class="star" data-value="4">&#9733;</span>
                                <span class="star" data-value="5">&#9733;</span>
                            </div>
                        </div>
                        <div>
                            <form id="review-form">
                                <textarea class="review-field" id="review-field" placeholder="Введите текст..." rows="3" cols="50"></textarea>
                                <button class="review-button" id="review-button">Оставить отзыв</button>
                            </form>
                        </div>
                    </div>
                    <div class="user-review" id="user-review">
                        <div class="user-review-block">
                            <div class="review-info">
                                <div class="text-average">Ваш отзыв</div>
                                <div class="rating" id="user-rating"><!-- оценка отзыва--><span>/5</span></div>
                            </div>
                            <div><hr class="solid"></div>
                            <div class="review-text" id="user-text"><!-- текст отзыва--></div>
                            <img src="${deleteIcon}" alt="Удалить" class="delete-review" id="delete-button">
                        </div>
                    </div>
                    <ul id="reviews">
                    </ul>
                </div>
                <div class="column2">
                    <div class="place-header">
                        <div class="place-name" id="place-name">
                            Название
                        </div>
                        <div class="back-button-block">
                            <img class="back-button" src="${backButton}" id="back-button">
                        </div>
                    </div>
                    <div class="place-info">
                        <div class="description" id="description">здесь будет описание</div>
                    </div>
                    <div class="map-container" id="map-container">
                        <div class="map-class" id="map"></div>
                    </div>
                </div>
            </div>
        </main>`,
    async mount(router: Router, params: any): Promise<void> {
        const backButton = document.getElementById('back-button') as HTMLButtonElement;
        const placeName = document.getElementById('place-name') as HTMLElement;
        const placeDescription = document.getElementById('description') as HTMLElement;
        const placeImage = document.getElementById('place-image') as HTMLImageElement;
        const reviewsElement = document.getElementById('reviews') as HTMLElement;
        const userRating = document.getElementById('user-rating') as HTMLElement;
        const userText = document.getElementById('user-text') as HTMLElement;
        const deleteButton = document.getElementById('delete-button') as HTMLButtonElement;
        const reviewForm = document.getElementById('review-form') as HTMLElement;
        const stars = Array.from(document.querySelectorAll('.star'));
        const userReviewElement = document.getElementById('user-review') as HTMLElement;
        const reviewElement = document.getElementById('leave-review') as HTMLElement;
        const reviewTextArea = document.getElementById('review-field') as HTMLTextAreaElement;

        // Монтирование хэдера
        await header.mount(router);

        backButton.addEventListener('click', () => {
            router.goto('/home');
        });

        const itemId: number = Number(params);
        const attractionResponse = await Api.getAttraction(itemId);
        const attraction = attractionResponse.data;
        const latitude: number = 55.7558;
        const longitude: number = 37.6173;
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

        const reviewsResponse = await Api.getReviews(itemId);
        let reviews = reviewsResponse.data;

        let userReview: any;
        if (User.id !== '') {
            userReview = reviews.find(review => review.user_login === User.username);
            if (userReview) {
                reviews = reviews.filter(review => review.user_login !== User.username);
                userRating.textContent = String(userReview.rating) + '/5';
                userRating.style.setProperty('--progress', String(userReview.rating));
                userText.textContent = userReview.review_text;
                userReviewElement.classList.toggle('visible');

            } else if (reviewElement) {
                reviewElement.classList.toggle('visible');
            }
        }

        reviewForm.addEventListener('submit', async (event) => {
            event.preventDefault();
            const star = stars.find(element => element.classList.contains('selected'));
            if (!star) {
                alert('Укажите рейтинг');
                return;
            }
            const raiting = Number(star.getAttribute('data-value'));
            const reviewText = (reviewTextArea).value;
            const res = await Api.postReview(Number(User.id), itemId, reviewText, raiting);

            (document.getElementById('review-field') as HTMLTextAreaElement).value = '';
            stars.forEach(star => {
                star.classList.remove('selected');
            });
            reviewElement.classList.remove('visible');

            userReview = res.data;
            userRating.textContent = String(userReview.rating);
            userRating.style.setProperty('--progress', String(userReview.rating));
            userText.textContent = userReview.review_text;
            userReviewElement.classList.toggle('visible');
        });

        deleteButton.addEventListener('click', async () => {
            const res = await Api.deleteReview(userReview.id, itemId);
            userReviewElement.classList.remove('visible');
            reviewElement.classList.toggle('visible');
        });

        placeName.textContent = attraction.name;
        placeDescription.textContent = attraction.description;
        placeImage.src = attraction.imagePath;

        reviewsElement.innerHTML = placeTemplate({reviews});

        stars.forEach(star => {
            star.addEventListener('click', () => {
                stars.forEach(s => s.classList.remove('selected'));
                star.classList.add('selected');
            });
        });

    },

    unmount(): void {}
};
