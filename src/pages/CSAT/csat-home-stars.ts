import starIcon from '../../static/star.svg';
import Api from '../../utils/Api';
import User from '../../utils/user';

export default {
    html: `
    <div class="home-question">
        <div class="csat-question-title">Как вам наш дизайн?</div>
        <star-container id="star-container">
            <div class="star">
                <input class="star-input" type="radio" id="rating1" name="rating" value="1">
                <img src="${starIcon}">
            </div>
            <div class="star">
                <input class="star-input" type="radio" id="rating1" name="rating" value="2">
                <img src="${starIcon}">
            </div>
            <div class="star">
                <input class="star-input" type="radio" id="rating1" name="rating" value="3">
                <img src="${starIcon}">
            </div>
            <div class="star">
                <input class="star-input" type="radio" id="rating1" name="rating" value="4">
                <img src="${starIcon}">
            </div>
            <div class="star">
                <input class="star-input" type="radio" id="rating1" name="rating" value="5">
                <img src="${starIcon}">
            </div>
        </star-container>
        <button class="csat-question-button" id="star-button">Далее</button>
    </div>
    `,
    mount(): void {
        const starContainer = document.getElementById('star-container') as HTMLElement;
        const starButton = document.getElementById('star-button') as HTMLButtonElement;
        let rating  = 0;

        starButton.addEventListener('click', async () => {
            if (User.id) {
                if (rating !== 0) {
                    const res = await Api.postHomeCSAT(User.id, rating);
                }
            } else {
                console.log('Пользователь не авторизован. Отзыв не отправлен');
            }
        });


        starContainer.addEventListener('change', async () => {
            const selectedRating = document.querySelector('#star-container input:checked') as HTMLInputElement;
            rating = Number(selectedRating.value);
            // if (rating > 3) {
            //
            // }
        });


    }
};
