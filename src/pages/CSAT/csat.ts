import CSAT from '../../utils/CSAT-memory';
import csatHomeQuestion from './csat-home-stars';
import Router from '../../utils/Router';

export default {
    html: `
       <div class="csat-root" id="csat-root"></div>
    `,

    async mount(): Promise<void> {
        const csatRoot = document.getElementById('csat-root') as HTMLElement;

        if (CSAT.homeActiveQ && !CSAT.homeQ) {
            csatRoot.innerHTML = csatHomeQuestion.html;
            await csatHomeQuestion.mount();
        }
    },

    unmount(): void {}
};
