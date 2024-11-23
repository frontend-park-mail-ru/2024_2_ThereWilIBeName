import starIcon from '../../static/star.svg';

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
        <button class="csat-question-button">Далее</button>
    </div>
    `,
    mount(): void {
        const starContainer = document.getElementById('star-container') as HTMLElement;

        starContainer.addEventListener('change', () => {
            const selectedRating = document.querySelector('#star-container input:checked') as HTMLInputElement;
            if (selectedRating) {
                console.log(`Выбранный рейтинг: ${selectedRating.value}`);
            } else {
                console.log('Рейтинг не выбран');
            }
        });


    }
};
