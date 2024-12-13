import galleryReviewsTemplate from './reviews.hbs';
import User from '../../utils/user';
import Api from '../../utils/Api';
import Router from '../../utils/Router';
import avatarPng from '../../static/avatar.png';
import deleteIcon from '../../static/delete.png';

export default async function reviewsLoad(itemId: number, router: Router) {
    const reviewsResponse = await Api.getReviews(itemId);
    const reviews = reviewsResponse.data;
    const galleryReviews = document.getElementById('reviews-gallery') as HTMLElement;
    galleryReviews.innerHTML = galleryReviewsTemplate({ reviews, avatarPng, deleteIcon});

    let deleteButtons = galleryReviews.querySelectorAll('.delete-review-button');
    deleteButtons.forEach(deleteButton => {
        const deleteButtonElement = deleteButton as HTMLButtonElement;
        const loginReview = (document.getElementById(`user-${deleteButton.id}`) as HTMLElement).textContent;
        if (loginReview === User.username) {
            deleteButtonElement.classList.remove('hidden');
        }
        deleteButtonElement.addEventListener('click', async () => {
            const resDeleteReview = await Api.deleteReview(deleteButton.id, itemId);
            if (!resDeleteReview.ok) {
                console.log('Ошибка удаления отзыва');
            }
            await reviewsLoad(itemId, router);
        });
    });
};
