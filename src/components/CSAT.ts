import Router from '../utils/Router';
import CSAT from '../utils/CSAT-memory';
import closeIcon from '../static/close icon.svg';

export default {
    html: `
        <div class="csat hidden" id="csat-block">
            <img src="${closeIcon}" class="close-button" id="close-button">
        </div>
    `,

    mount(): void {

        const csatBlock = document.getElementById('csat-block') as HTMLElement;

        const closeButton = document.getElementById('close-button') as HTMLButtonElement;
        closeButton.addEventListener('click', () => {
            csatBlock.classList.add('hidden');
        });

        if (CSAT.homeActiveQ && !CSAT.homeQ) {
            csatBlock.classList.remove('hidden');
        }
    }
};
