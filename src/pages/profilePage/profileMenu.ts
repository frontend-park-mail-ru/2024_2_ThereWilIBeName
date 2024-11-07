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
        const galleryProfileElement = document.getElementById('gallery-profile') as HTMLElement;
        galleryProfileElement.innerHTML = '';
        galleryProfileElement.innerHTML = galleryTemplateTrips({ trips, tripIcon, myBlackIcon });
    }

    if (activeMenuButton.textContent === 'Достижения') {
        // const achievementsResponse = await Api.getAchievements();
        // const achievements = achievementsResponse.data;
        const galleryProfileElement = document.getElementById('gallery-profile') as HTMLElement;
        galleryProfileElement.innerHTML = `<img src="${ inProgressPng }">`;
        // galleryProfileElement.innerHTML = galleryTemplateAchievements({ achievements, defaultAchievementIcon });
    }

    if (activeMenuButton.textContent === 'Отзывы') {
        // const reviewsResponse = await Api.getReviews();
        // const reviews = reviewsResponse.data;
        const galleryProfileElement = document.getElementById('gallery-profile') as HTMLElement;
        galleryProfileElement.innerHTML = `<img src="${ inProgressPng }">`;
        // galleryProfileElement.innerHTML = galleryTemplateReviews({ reviews });
    }

};
