import Router from '../utils/Router';
import CSAT from '../utils/CSAT-memory';
import closeIcon from '../static/close icon.svg';

export default {
    html: `
        <div class="csat" id="csat-block">
            <img src="${closeIcon}" class="close-button" id="csat-close-button">
        </div>
    `,

    mount(): void {
        const csatBlock = document.getElementById('csat-block') as HTMLElement;

        const closeButton = document.getElementById('csat-close-button') as HTMLButtonElement;
        closeButton.addEventListener('click', () => {
            csatBlock.classList.add('hidden');
            CSAT.homeActiveQ = false;
        });

        if (!CSAT.homeActiveQ || CSAT.homeQ) {
            csatBlock.classList.add('hidden');
        }
    }
};
