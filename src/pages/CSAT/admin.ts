import header from '../../components/header';
import footer from '../../components/footer';

export default {
    html: `
        ${header.html}
       <div class="admin-main" id="admin-main"></div>
       ${footer.html}
    `,

    async mount(): Promise<void> {

    },

    unmount(): void {

    }
};
