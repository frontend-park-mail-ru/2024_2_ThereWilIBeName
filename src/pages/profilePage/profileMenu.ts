import galleryTemplateTrips from './profileTrips.hbs';
import galleryTemplateAchievements from './profileAchievements.hbs';
import galleryTemplateReviews from './profileReviews.hbs';
import Api from '../../utils/Api';
import User from '../../utils/user';

import defaultAchievementIcon from '../../static/achievement.png';
import tripIcon from '../../static/trip_icon.png';

export default async function updateMenu(activeMenuButton: HTMLElement) {

    if (activeMenuButton.textContent === 'Поездки') {
        const tripsResponse = await Api.getUserTrips(User.id);
        const trips = tripsResponse.data;
        const galleryProfileElement = document.getElementById('gallery-profile') as HTMLElement;
        galleryProfileElement.textContent = 'Здесь будут ваши поездки';
        if (trips) {
            galleryProfileElement.innerHTML = galleryTemplateTrips({ trips, tripIcon });
        }
    }

    if (activeMenuButton.textContent === 'Достижения') {
        // const achievementsResponse = await Api.getAchievements();
        const achievementsResponse = {
            data: [
                {},{},{},{}
            ],
            status: 200,
            ok: true,
        };
        const achievements = achievementsResponse.data;
        const galleryProfileElement = document.getElementById('gallery-profile') as HTMLElement;
        galleryProfileElement.textContent = 'Здесь будут ваши достижения';
        if (achievements) {
            galleryProfileElement.innerHTML = galleryTemplateAchievements({ achievements, defaultAchievementIcon });
        }
    }

    if (activeMenuButton.textContent === 'Отзывы') {
        // const reviewsResponse = await Api.getReviews();
        const reviewsResponse = {
            data: [],
            status: 200,
            ok: true,
        };
        const reviews = reviewsResponse.data;
        const galleryProfileElement = document.getElementById('gallery-profile') as HTMLElement;
        galleryProfileElement.textContent = 'Здесь будут ваши отзывы';
        if (reviews) {
            galleryProfileElement.innerHTML = galleryTemplateReviews({ reviews });
        }
    }

};
