import Router from '../../utils/Router';
import galleryReviewsTemplate from './reviews.hbs';
import Api from '../../utils/Api';

export default async function reviewsLoad(itemId: number, router: Router) {
    const reviewsResponse = await Api.getReviews(itemId);
    const reviews = reviewsResponse.data;
    // const reviews = [
    //     {id: 0, userLogin: 'Test User', avatarPath: '../../static/map marker.svg', rating: 3, reviewText: 'Очень крутое место!'},
    //     {id: 0, userLogin: 'Test User', avatarPath: '../../static/map marker.svg', rating: 3, reviewText: 'Очень крутое место!'},
    //     {id: 0, userLogin: 'Test User', avatarPath: '../../static/map marker.svg', rating: 3, reviewText: 'Очень крутое место!'},
    //     {id: 0, userLogin: 'Test User', avatarPath: '../../static/map marker.svg', rating: 3, reviewText: 'Очень крутое место!'},
    // ];
    const galleryReviews = document.getElementById('reviews-gallery') as HTMLElement;
    galleryReviews.innerHTML = galleryReviewsTemplate({ reviews });
};
