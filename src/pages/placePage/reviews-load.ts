import galleryReviewsTemplate from './reviews.hbs';
import Api from '../../utils/Api';
import avatarPng from '../../static/avatar.png';

export default async function reviewsLoad(itemId: number) {
    const reviewsResponse = await Api.getReviews(itemId);
    const reviews = reviewsResponse.data;
    const galleryReviews = document.getElementById('reviews-gallery') as HTMLElement;
    galleryReviews.innerHTML = galleryReviewsTemplate({ reviews, avatarPng});
};
