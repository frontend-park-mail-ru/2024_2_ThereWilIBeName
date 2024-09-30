
export default {
    html:
        `<header class="header">
            <div class="logo" >
                <img src="/src/static/logo.png" alt="Логотип" class="logo-image">
            </div>
            <div class="auth">
                <button class="login-button" id="signin-button">вход</button>
            </div>
        </header>
        <main>
            <div>Ошибка 404</div>
            <button class="login-button" id="error-button">На главную</button>
        </main>`,

    mount(router) {
        document.getElementById('error-button').addEventListener('click', () => {
            router.goto('/home');
        });
    },

    unmount() {

    },
};
