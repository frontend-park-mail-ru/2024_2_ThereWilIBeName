import Api from '../../utils/Api';
import User from '../../utils/user';
import placeTemplate from './place.hbs';
import Router from '../../utils/Router';
import deleteIcon from '../../static/delete.png';
import logoImage from '../../static/logo.png';
import headerMount from '../headerMount';

export default {
    html:
        `<header class="header">
            <div class="logo">
                <img src="${logoImage}" alt="Логотип" class="logo-image" id="logo-image">
            </div>
            <div class="header-menu">
                <button class="header-button" id="signin-button">вход</button>
                <button class="user-button" id="user-button"></button>
                
                <div id="side-menu" class="side-menu">
                    <div class="background-menu" id="background-menu"></div>
                    <div class="user-name" id="user-name"></div>
                    <ul>
                        <li><button class="menu-button" id="change-user-button">Сменить пользователя</button></li>
                        <li><button class="menu-button" id="profile-button">Профиль</button></li>
                        <li><button class="menu-button" id="logout-button">Выйти</button></li>
                    </ul>
                    <button id="close-button" class="close-button">Закрыть</button>
                </div>
            </div>
        </header>
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
                    <button class="delete-review" id="delete-button">
                        <img src="${deleteIcon}">
                    </button>
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
                <div class="back-button" id="back-button"><div class="arrow">➜</div></div>
            </div>
            <div class="place-info">
                <div class="description" id="description">здесь будет описание</div>
            </div>
            <div class="map-image">
                <img src="" alt="Место на карте" id="map-image">
            </div>
        </div>
    </div>
</main>`,
    async mount(router: Router, params: any): Promise<void> {
        const backButton = document.getElementById('back-button') as HTMLButtonElement;
        const placeName = document.getElementById('place-name') as HTMLElement;
        const placeDescription = document.getElementById('description') as HTMLElement;
        const placeImage = document.getElementById('place-image') as HTMLImageElement;
        const mapImage = document.getElementById('map-image') as HTMLImageElement;
        const reviewsElement = document.getElementById('reviews') as HTMLElement;
        const userRating = document.getElementById('user-rating') as HTMLElement;
        const userText = document.getElementById('user-text') as HTMLElement;
        const reviewButton = document.getElementById('review-button') as HTMLButtonElement;
        const deleteButton = document.getElementById('delete-button') as HTMLButtonElement;
        const reviewForm = document.getElementById('review-form') as HTMLElement;
        const stars = document.querySelectorAll('.star');
        const userReviewElement = document.getElementById('user-review') as HTMLElement;
        const reviewElement = document.getElementById('leave-review') as HTMLElement;


        // Монтирование хэдера
        const homeLogo = document.getElementById('logo-image') as HTMLElement;
        const signinButton = document.getElementById('signin-button') as HTMLButtonElement;
        const userButton = document.getElementById('user-button') as HTMLButtonElement;
        const sideMenu = document.getElementById('side-menu') as HTMLElement;
        const userNameDiv = document.getElementById('user-name') as HTMLElement;
        const backgroundMenu = document.getElementById('background-menu') as HTMLElement;
        const profileButton = document.getElementById('profile-button') as HTMLButtonElement;
        const closeButton = document.getElementById('close-button') as HTMLButtonElement;
        const logoutButton = document.getElementById('logout-button') as HTMLButtonElement;
        const changeUserButton = document.getElementById('change-user-button') as HTMLButtonElement;
        await headerMount(router, sideMenu, userButton, closeButton, backgroundMenu, profileButton, changeUserButton, signinButton, logoutButton, homeLogo, userNameDiv);


        backButton.addEventListener('click', () => {
            router.goto('/home');
        });

        const itemId: number = Number(params);
        const attractionResponse = await Api.getAttraction(itemId);
        const attraction = attractionResponse.data;

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

            const text = (document.getElementById('review-field') as HTMLTextAreaElement).value;
            let selectedStars = 0;
            stars.forEach(star => {
                if (star.classList.contains('selected')) {
                    selectedStars++;
                }
            });
            const res = await Api.postReview(Number(User.id), itemId, text, selectedStars);

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
        mapImage.src = attraction.imagePath;

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
