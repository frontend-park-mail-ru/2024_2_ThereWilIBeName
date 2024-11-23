import header from '../../components/header';
import footer from '../../components/footer';
import Router from '../../utils/Router';

export default {
    html: `
        ${header.html}
        <div class="admin-main" id="admin-main">
            <div class="table-question">
                <div class="title-question title-grid" id="question-design">Как вам дизайн?</div>
                <div class="avg-rating avg-grid">0.0</div>
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
                <div class="title-question title-grid" id="question-design">Как вам поиск?</div>
                <div class="avg-rating avg-grid">0.0</div>
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
                <div class="title-question title-grid" id="question-design">Как вам поездки?</div>
                <div class="avg-rating avg-grid">0.0</div>
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
                <div class="title-question title-grid" id="question-design">Как вам профиль?</div>
                <div class="avg-rating avg-grid">0.0</div>
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

    },

    unmount(): void {

    }
};
