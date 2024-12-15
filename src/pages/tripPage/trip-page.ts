import Api from '../../utils/Api';
import Router from '../../utils/Router';
import header from '../../components/header';
import footer from '../../components/footer';

export default {
    html:
        `
        ${header.html}
        <main>
            
        </main>
        ${footer.html}
`,
    async mount(router: Router, params: any): Promise<void> {

        // Монтирование хэдера
        await header.mount(router);

        const itemId: number = Number(params);
        // const tripResponse = await Api.getTrip(itemId);

    },

    unmount(): void {}
};
