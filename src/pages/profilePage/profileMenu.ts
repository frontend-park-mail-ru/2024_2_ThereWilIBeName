import galleryTemplateTrips from './profileTrips.hbs';
import galleryTemplateAchievements from './profileAchievements.hbs';
import galleryTemplateReviews from './profileReviews.hbs';
import myBlackIcon from '../../static/232323.png';
import inProgressPng from '../../static/in progress.png';
import palmsImg from '../../static/please white.svg';
import palmsImgB from '../../static/please black.svg';
import Api from '../../utils/Api';
import User from '../../utils/user';

import defaultAchievementIcon from '../../static/achievement.png';
import tripIcon from '../../static/trip_icon.png';
import defaultAvatar from '../../static/avatar.png';

export default async function updateMenu(activeMenuButton: HTMLElement) {

    if (activeMenuButton.textContent === 'Поездки') {
        const galleryProfileElement = document.getElementById('gallery-profile') as HTMLElement;
        galleryProfileElement.innerHTML =
            `<div class="please-block">
                    <img src="${palmsImgB}" class="please-img">
                    <div class="auth-please" id="auth-please">У вас нет поездок</div>
                </div>`;
        const tripsResponse = await Api.getUserTrips(User.id);
        const trips = tripsResponse.data;
        if (tripsResponse.status === 200) {
            galleryProfileElement.innerHTML = galleryTemplateTrips({ trips, tripIcon, myBlackIcon, palmsImg });
        }
    }

    if (activeMenuButton.textContent === 'Достижения') {
        const galleryProfileElement = document.getElementById('gallery-profile') as HTMLElement;
        galleryProfileElement.innerHTML =
            `<div class="please-block">
                <img src="${palmsImgB}" class="please-img">
                <div class="auth-please" id="auth-please">У вас пока нет достижений</div>
            </div>`;
        const achievementsResponse = await Api.getAchievements(User.id);
        const achievements = achievementsResponse.data;
        if (achievements) {
            galleryProfileElement.innerHTML = galleryTemplateAchievements({ achievements });
        }
    }


    if (activeMenuButton.textContent === 'Отзывы') {
        const resProfile = await Api.getProfile(User.id);
        const avatarPathReview = resProfile.data.avatarPath ?
            `/avatars/${resProfile.data.avatarPath}` : defaultAvatar;

        const galleryProfileElement = document.getElementById('gallery-profile') as HTMLElement;
        galleryProfileElement.innerHTML =
            `<div class="please-block">
                <img src="${palmsImgB}" class="please-img">
                <div class="auth-please" id="auth-please">Здесь будут ваши отзывы</div>
            </div>`;
        const reviewsResponse = await Api.getUserReviews(User.id);
        const reviews = reviewsResponse.data;
        if (reviewsResponse.status === 200) {
            galleryProfileElement.innerHTML = galleryTemplateReviews({ reviews, avatarPathReview});
        }
    }
};
