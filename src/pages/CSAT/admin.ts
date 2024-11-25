import header from '../../components/header';
import footer from '../../components/footer';
import Api from '../../utils/Api';
import Router from '../../utils/Router';

export default {
    html: `
        ${header.html}
        <div class="admin-main" id="admin-main">
            <div class="table-question">
                <div class="title-question title-grid" id="title-design">Как вам дизайн?</div>
                <div class="avg-rating avg-grid" id="avg-rating-design">0.0</div>
                <div class="star-number one-star-grid">1 звезда</div>
                <div class="star-count one-star-count-grid" id="one-star-design">0</div>
                <div class="star-number two-star-grid">2 звезды</div>
                <div class="star-count two-star-count-grid" id="two-star-design">0</div>
                <div class="star-number three-star-grid" >3 звезды</div>
                <div class="star-count three-star-count-grid" id="three-star-design">0</div>
                <div class="star-number four-star-grid" >4 звезды</div>
                <div class="star-count four-star-count-grid" id="four-star-design">0</div>
                <div class="star-number five-star-grid" >5 звёзд</div>
                <div class="star-count five-star-count-grid" id="five-star-design">0</div>
            </div>
        </div>
        ${footer.html}
    `,

    async mount(router: Router): Promise<void> {

        await header.mount(router);

        const designSurveyNumber = '1';

        const data = (await Api.getStat(designSurveyNumber)).data;

        const title = document.getElementById('title-design') as HTMLElement;
        title.textContent = data.surveyText;
        const avgCount = document.getElementById('avg-rating-design') as HTMLElement;
        avgCount.textContent = String(data.avgRating);
        const oneStar = document.getElementById('one-star-design') as HTMLElement;
        oneStar.textContent = String((data.ratingsCount)[1]);
        const twoStar = document.getElementById('two-star-design') as HTMLElement;
        twoStar.textContent = String((data.ratingsCount)[2]);
        const threeStar = document.getElementById('three-star-design') as HTMLElement;
        threeStar.textContent = String((data.ratingsCount)[3]);
        const fourStar = document.getElementById('four-star-design') as HTMLElement;
        fourStar.textContent = String((data.ratingsCount)[4]);
        const fiveStar = document.getElementById('five-star-design') as HTMLElement;
        fiveStar.textContent = String((data.ratingsCount)[5]);

    },

    unmount(): void {

    }
};
