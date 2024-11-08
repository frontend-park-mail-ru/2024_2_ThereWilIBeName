import galleryTemplateTrips from './profileTrips.hbs';
import galleryTemplateAchievements from './profileAchievements.hbs';
import galleryTemplateReviews from './profileReviews.hbs';
import myBlackIcon from '../../static/232323.png';
import inProgressPng from '../../static/in progress.png';
import palmsImg from '../../static/please black.png';
import Api from '../../utils/Api';
import User from '../../utils/user';

import defaultAchievementIcon from '../../static/achievement.png';
import tripIcon from '../../static/trip_icon.png';

export default async function updateMenu(activeMenuButton: HTMLElement) {

    if (activeMenuButton.textContent === 'Поездки') {
        const tripsResponse = await Api.getUserTrips(User.id);
        const trips = tripsResponse.data;
        const galleryProfileElement = document.getElementById('gallery-profile') as HTMLElement;
        if (trips !== undefined) {
            galleryProfileElement.innerHTML = '';
            galleryProfileElement.innerHTML = galleryTemplateTrips({ trips, tripIcon, myBlackIcon });
        }
        else {
            galleryProfileElement.innerHTML =
                `<div class="please-block">
                    <img src="${palmsImg}" class="please-img">
                    <div class="auth-please" id="auth-please">У вас нет поездок</div>
                </div>`;
        }

    }

    if (activeMenuButton.textContent === 'Достижения') {
        // const achievementsResponse = await Api.getAchievements();
        // const achievements = achievementsResponse.data;
        const galleryProfileElement = document.getElementById('gallery-profile') as HTMLElement;
        galleryProfileElement.innerHTML =
            `<div class="please-block">
                <img src="${palmsImg}" class="please-img">
                <div class="auth-please" id="auth-please">Достижения в разработке</div>
            </div>`;
        // galleryProfileElement.innerHTML = galleryTemplateAchievements({ achievements, defaultAchievementIcon });
    }

    if (activeMenuButton.textContent === 'Отзывы') {
        const reviewsResponse = await Api.getUserReviews(User.id);
        const reviews = reviewsResponse.data;
        const galleryProfileElement = document.getElementById('gallery-profile') as HTMLElement;
        if (reviews !== undefined) {
            galleryProfileElement.innerHTML = galleryTemplateReviews({ reviews });
        }
        else {
            galleryProfileElement.innerHTML =
                `<div class="please-block">
                <img src="${palmsImg}" class="please-img">
                <div class="auth-please" id="auth-please">Список отзывов в разработке</div>
            </div>`;
        }
    }
};
