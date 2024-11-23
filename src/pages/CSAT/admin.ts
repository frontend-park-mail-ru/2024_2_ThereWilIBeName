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
                <div class="star-number one-star-grid">1 звезда</div>
                <div class="star-count one-star-count-grid" id="one-star-1">0</div>
                <div class="star-number two-star-grid">2 звезды</div>
                <div class="star-count two-star-count-grid" id="two-star-1">0</div>
                <div class="star-number three-star-grid" >3 звезды</div>
                <div class="star-count three-star-count-grid" id="three-star-1">0</div>
                <div class="star-number four-star-grid" >4 звезды</div>
                <div class="star-count four-star-count-grid" id="four-star-1">0</div>
                <div class="star-number five-star-grid" >5 звёзд</div>
                <div class="star-count five-star-count-grid" id="five-star-1">0</div>
            </div>
            <div class="table-question">
                <div class="title-question title-grid" id="question-search">Как вам поиск?</div>
                <div class="avg-rating avg-grid" id="avg-rating-search">0.0</div>
                <div class="star-number one-star-grid" >1 звезда</div>
                <div class="star-count one-star-count-grid" id="one-star-2">0</div>
                <div class="star-number two-star-grid" >2 звезды</div>
                <div class="star-count two-star-count-grid" id="two-star-2">0</div>
                <div class="star-number three-star-grid">3 звезды</div>
                <div class="star-count three-star-count-grid" id="three-star-2">0</div>
                <div class="star-number four-star-grid">4 звезды</div>
                <div class="star-count four-star-count-grid" id="four-star-2">0</div>
                <div class="star-number five-star-grid">5 звёзд</div>
                <div class="star-count five-star-count-grid" id="five-star-2">0</div>
            </div>
            <div class="table-question">
                <div class="title-question title-grid" id="question-trips">Как вам поездки?</div>
                <div class="avg-rating avg-grid" id="avg-rating-trips">0.0</div>
                <div class="star-number one-star-grid">1 звезда</div>
                <div class="star-count one-star-count-grid" id="three-star-3">0</div>
                <div class="star-number two-star-grid">2 звезды</div>
                <div class="star-count two-star-count-grid" id="three-star-3">0</div>
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
                <div class="star-number one-star-grid" id="one-star-4">1 звезда</div>
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
            oneStar.textContent = String((data.ratingsCount)[1]);
            let twoStar = document.getElementById(`two-star-${item}`) as HTMLElement;
            twoStar.textContent = String((data.ratingsCount)[2]);
            let threeStar = document.getElementById(`three-star-${item}`) as HTMLElement;
            threeStar.textContent = String((data.ratingsCount)[3]);
            let fourStar = document.getElementById(`four-star-${item}`) as HTMLElement;
            fourStar.textContent = String((data.ratingsCount)[4]);
            let fiveStar = document.getElementById(`five-star-${item}`) as HTMLElement;
            fiveStar.textContent = String((data.ratingsCount)[5]);
        }

    },

    unmount(): void {

    }
};
