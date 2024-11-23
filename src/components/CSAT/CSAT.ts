import Router from '../../utils/Router';
import CSAT from '../../utils/CSAT-memory';
import closeIcon from '../../static/close icon.svg';
import csatHomeQuestion from './csat-home-question';

export default {
    html: `
        <div class="csat hidden hidden-animation" id="csat-block">
            <img src="${closeIcon}" class="csat-close-button" id="csat-close-button">
            <div class="csat-root" id="csat-root">
                
            </div>
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

        const csatRoot = document.getElementById('csat-root') as HTMLElement;

        if (CSAT.homeActiveQ && !CSAT.homeQ) {

            csatBlock.classList.remove('hidden');
            await new Promise(resolve => setTimeout(resolve, 200));
            csatBlock.classList.remove('hidden-animation');

            csatRoot.innerHTML = csatHomeQuestion.html;
        }
    }
};
