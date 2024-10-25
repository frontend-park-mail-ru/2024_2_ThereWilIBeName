import Router from '../utils/Router'

export default {

    html: `<header class="header">
            <div class="logo" >
                <img src="/src/static/logo.png" alt="Логотип" class="logo-image">
            </div>
        </header>
        <main class="warn-message">
            <div class="warning">Здесь будет профиль :)</div>
            <button class="unknown-page-button" id="error-button">На главную</button>
        </main>`,

    async mount(router: Router): Promise<void> {
        const errorButton = document.getElementById('error-button')
        errorButton!.addEventListener('click', () => {
            router.goto('/home');
        });
    },

    unmount() {

    }
}