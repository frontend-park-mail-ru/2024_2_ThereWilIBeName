import galleryTemplateTrips from './profileTrips.hbs';
import galleryTemplateAchievements from './profileAchievements.hbs';
import galleryTemplateReviews from './profileReviews.hbs';
import myBlackIcon from '../../static/232323.png';
import inProgressPng from '../../static/in progress.png';
import Api from '../../utils/Api';
import User from '../../utils/user';

import defaultAchievementIcon from '../../static/achievement.png';
import tripIcon from '../../static/trip_icon.png';

export default async function updateMenu(activeMenuButton: HTMLElement) {

    if (activeMenuButton.textContent === 'Поездки') {
        const tripsResponse = await Api.getUserTrips(User.id);
        const trips = tripsResponse.data;
        if (trips) {
            const galleryProfileElement = document.getElementById('gallery-profile') as HTMLElement;
            galleryProfileElement.innerHTML = '';
            galleryProfileElement.innerHTML = galleryTemplateTrips({ trips, tripIcon, myBlackIcon });
        }
    }

    if (activeMenuButton.textContent === 'Достижения') {
        // const achievementsResponse = await Api.getAchievements();
        // const achievements = achievementsResponse.data;
        const achievements = [
            {
                placeName: 'Москва',
                rating: '5',
                reviewText: 'Очень понравилось место. Остался бы здесь жить'
            },
        ];
        const galleryProfileElement = document.getElementById('gallery-profile') as HTMLElement;
        galleryProfileElement.innerHTML = galleryTemplateAchievements({ achievements, defaultAchievementIcon });
        galleryProfileElement.insertAdjacentHTML('beforeend', `<img src="${ inProgressPng }" class="in-progress-img">`);
    }

    if (activeMenuButton.textContent === 'Отзывы') {
        // const reviewsResponse = await Api.getUserReviews(User.id);
        // const reviews = reviewsResponse.data;
        const reviews = [{},{},{},{}];
        const galleryProfileElement = document.getElementById('gallery-profile') as HTMLElement;
        galleryProfileElement.innerHTML = galleryTemplateReviews({ reviews });
        galleryProfileElement.insertAdjacentHTML('beforeend', `<img src="${ inProgressPng }" class="in-progress-img">`);
    }
};
