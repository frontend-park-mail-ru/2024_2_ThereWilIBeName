import Router from '../utils/Router';

import logoImage from '../static/logo black.svg';

export default {
    html: `
                <div class="space"></div>
                <footer class="footer">
                <img src="${logoImage}" class="logo-grid">
                <div class="front-grid">frontend</div>
                
                <a class="grisha-grid" href="https://github.com/SLDminor">Григорий Громыко</a>
                <div class="back-one-grid">backend</div>
                <a class="ksusha-grid" href="https://github.com/mevain">Ксения Бардыкина</a>
                <div class="back-two-grid">backend</div>
                <a class="dana-grid" href="https://github.com/AnnHarvard">Дана Шаклеина</a>
                <div class="back-three-grid">backend</div>
                <a class="timur-grid" href="https://github.com/timurIsaevIY">Тимур Исаев</a>
            </footer>`,

    async mount(): Promise<void> {
    }
};
