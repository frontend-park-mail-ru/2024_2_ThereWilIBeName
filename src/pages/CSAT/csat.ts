import CSAT from '../../utils/CSAT-memory';
import csatHomeQuestion from './csat-home-question';

export default {
    html: `
        <!DOCTYPE html>
        <html>
            <head>
                <meta charset="utf-8">
                <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
                <link href="/src/styles/csat.styl" rel="stylesheet" id="css-file">
            </head>
            <body>
                <div class="csat-root" id="csat-root"></div>
            </body>
        </html>
    `,

    async mount(): Promise<void> {

        const csatRoot = document.getElementById('csat-root') as HTMLElement;

        if (CSAT.homeActiveQ && !CSAT.homeQ) {
            csatRoot.innerHTML = csatHomeQuestion.html;
        }
    },

    unmount(): void {}
};
