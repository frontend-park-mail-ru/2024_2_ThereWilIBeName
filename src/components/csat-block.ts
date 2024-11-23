import CSAT from '../utils/CSAT-memory';
import csat from '../pages/CSAT/csat';
import closeIcon from '../static/close icon.svg';
import CSATPage from '../pages/CSAT/csat';

export default {
    html: `
        <div class="csat hidden hidden-animation" id="csat-block">
            <img src="${closeIcon}" class="csat-close-button" id="csat-close-button">
            <iframe src="https://therewillbetrip.ru/csat"></iframe>
        </div>
    `,

    async mount(): Promise<void> {
        const csatBlock = document.getElementById('csat-block') as HTMLElement;

        const closeButton = document.getElementById('csat-close-button') as HTMLButtonElement;
        closeButton.addEventListener('click', async () => {
            csatBlock.classList.add('hidden-animation');
            await new Promise(resolve => setTimeout(resolve, 200));
            csatBlock.classList.add('hidden');
            CSAT.homeActiveQ = false;
        });

        if (CSAT.homeActiveQ && !CSAT.homeQ) {
            csatBlock.classList.remove('hidden');
            await new Promise(resolve => setTimeout(resolve, 200));
            csatBlock.classList.remove('hidden-animation');
        }

    }
};
