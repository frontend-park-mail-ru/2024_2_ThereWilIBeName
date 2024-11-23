import Router from '../utils/Router';
import CSAT from '../utils/CSAT-memory';

export default {
    html: `
        <div class="csat hidden" id="csat-block">
            
        </div>
    `,

    mount(): void {

        const csatBlock = document.getElementById('csat-block') as HTMLElement;

        if (CSAT.homeActiveQ && !CSAT.homeQ) {
            csatBlock.classList.remove('hidden');
        }
    }
};
