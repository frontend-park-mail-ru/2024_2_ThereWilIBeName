import Router from '../utils/Router';
import CSAT from '../utils/CSAT-memory';
import closeIcon from '../static/close icon.svg';

export default {
    html: `
        <div class="csat" id="csat-block">
            <img src="${closeIcon}" class="close-button" id="close-button">
        </div>
    `,

    async mount(): Promise<void> {
        const csatBlock = document.getElementById('csat-block') as HTMLElement;

        const closeButton = document.getElementById('close-button') as HTMLButtonElement;
        closeButton.addEventListener('click', () => {
            csatBlock.classList.add('hidden');
            CSAT.homeActiveQ = false;
        });

        if (!CSAT.homeActiveQ || CSAT.homeQ) {
            csatBlock.classList.add('hidden');
        }
    },

    active(): void {
        const csatBlock = document.getElementById('csat-block') as HTMLElement;
    }
};
