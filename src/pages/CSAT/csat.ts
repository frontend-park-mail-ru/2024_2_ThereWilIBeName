import CSAT from '../../utils/CSAT-memory';
import csatHomeQuestion from './csat-home-stars';
import csatSearchQuestion from './csat-search-stars';
import csatTripsQuestion from './csat-trips-stars';
import csatProfileQuestion from './csat-profile-stars';
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
        if (CSAT.searchActiveQ && !CSAT.homeActiveQ) {
            csatRoot.innerHTML = csatSearchQuestion.html;
            await csatSearchQuestion.mount();
        }
        if (CSAT.tripsActiveQ && !CSAT.tripsQ) {
            csatRoot.innerHTML = csatTripsQuestion.html;
            await csatTripsQuestion.mount();
        }
        if (CSAT.profileActiveQ && !CSAT.profileQ) {
            csatRoot.innerHTML = csatProfileQuestion.html;
            await csatProfileQuestion.mount();
        }
    },

    unmount(): void {}
};
