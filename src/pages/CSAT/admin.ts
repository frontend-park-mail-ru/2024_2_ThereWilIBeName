import header from '../../components/header';
import footer from '../../components/footer';
import Router from '../../utils/Router';
import Api from '../../utils/Api';
import User from '../../utils/user';

export default {
    html: `
        ${header.html}
        <div class="admin-main" id="admin-main">
            <div class="table-question">
                <div class="title-question title-grid" id="title-1">Как вам дизайн?</div>
                <div class="avg-rating avg-grid" id="avg-rating-1">0.0</div>
                <div class="star-number one-star-grid" id="one-star-1">1 звезда</div>
                <div class="star-count one-star-count-grid">0</div>
                <div class="star-number two-star-grid" id="two-star-1">2 звезды</div>
                <div class="star-count two-star-count-grid">0</div>
                <div class="star-number three-star-grid" id="three-star-1">3 звезды</div>
                <div class="star-count three-star-count-grid">0</div>
                <div class="star-number four-star-grid" id="four-star-1">4 звезды</div>
                <div class="star-count four-star-count-grid">0</div>
                <div class="star-number five-star-grid" id="five-star-1">5 звёзд</div>
                <div class="star-count five-star-count-grid">0</div>
            </div>
            <div class="table-question">
                <div class="title-question title-grid" id="question-search">Как вам поиск?</div>
                <div class="avg-rating avg-grid" id="avg-rating-search">0.0</div>
                <div class="star-number one-star-grid">1 звезда</div>
                <div class="star-count one-star-count-grid">0</div>
                <div class="star-number two-star-grid">2 звезды</div>
                <div class="star-count two-star-count-grid">0</div>
                <div class="star-number three-star-grid">3 звезды</div>
                <div class="star-count three-star-count-grid">0</div>
                <div class="star-number four-star-grid">4 звезды</div>
                <div class="star-count four-star-count-grid">0</div>
                <div class="star-number five-star-grid">5 звёзд</div>
                <div class="star-count five-star-count-grid">0</div>
            </div>
            <div class="table-question">
                <div class="title-question title-grid" id="question-trips">Как вам поездки?</div>
                <div class="avg-rating avg-grid" id="avg-rating-trips">0.0</div>
                <div class="star-number one-star-grid">1 звезда</div>
                <div class="star-count one-star-count-grid">0</div>
                <div class="star-number two-star-grid">2 звезды</div>
                <div class="star-count two-star-count-grid">0</div>
                <div class="star-number three-star-grid">3 звезды</div>
                <div class="star-count three-star-count-grid">0</div>
                <div class="star-number four-star-grid">4 звезды</div>
                <div class="star-count four-star-count-grid">0</div>
                <div class="star-number five-star-grid">5 звёзд</div>
                <div class="star-count five-star-count-grid">0</div>
            </div>
            <div class="table-question">
                <div class="title-question title-grid" id="question-profile">Как вам профиль?</div>
                <div class="avg-rating avg-grid" id="avg-rating-profile">0.0</div>
                <div class="star-number one-star-grid">1 звезда</div>
                <div class="star-count one-star-count-grid">0</div>
                <div class="star-number two-star-grid">2 звезды</div>
                <div class="star-count two-star-count-grid">0</div>
                <div class="star-number three-star-grid">3 звезды</div>
                <div class="star-count three-star-count-grid">0</div>
                <div class="star-number four-star-grid">4 звезды</div>
                <div class="star-count four-star-count-grid">0</div>
                <div class="star-number five-star-grid">5 звёзд</div>
                <div class="star-count five-star-count-grid">0</div>
            </div>
        </div>
        ${footer.html}
    `,

    async mount(router: Router): Promise<void> {

        await header.mount(router);

        User.id = (await Api.getUser()).data.id;
        const numberOfSurvey = [1, 2, 3, 4]

        for (let item of numberOfSurvey) {
            const data = (await Api.getStat(String(item))).data;
            let title = document.getElementById(`title-${item}`) as HTMLElement;
            title.textContent = data.surveyText;
            let avgCount = document.getElementById(`avg-raiting-${item}`) as HTMLElement;
            avgCount.textContent = String(data.avgRating);
            let oneStar = document.getElementById(`one-star-${item}`) as HTMLElement;
        }

    },

    unmount(): void {

    }
};
