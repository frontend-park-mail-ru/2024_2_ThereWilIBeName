import Router from '../utils/Router';
import CSAT from '../utils/CSAT-memory';
import closeIcon from '../static/close icon.svg';

export default {
    html: `
        <div class="csat hidden-animation" id="csat-block">
            <img src="${closeIcon}" class="csat-close-button" id="csat-close-button">
        </div>
    `,

    async mount(): Promise<void> {
        const csatBlock = document.getElementById('csat-block') as HTMLElement;
        csatBlock.classList.remove('hidden-animation');

        const closeButton = document.getElementById('csat-close-button') as HTMLButtonElement;
        closeButton.addEventListener('click', async () => {
            csatBlock.classList.add('hidden-animation');
            await new Promise(resolve => setTimeout(resolve, 200));
            csatBlock.classList.add('hidden');
            CSAT.homeActiveQ = false;
        });

        if (!CSAT.homeActiveQ || CSAT.homeQ) {
            csatBlock.classList.add('hidden-animation');
            await new Promise(resolve => setTimeout(resolve, 200));
            csatBlock.classList.add('hidden');
        }
    }
};
