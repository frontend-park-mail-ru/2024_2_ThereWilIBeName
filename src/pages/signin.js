
export default {
    html:
        `
    <header class="header">
        <div class="logo">
            <img src="logo.png" alt="Логотип" class="logo-image">
        </div>
        <div class="auth">
            <button class="login-button" id="signup-button">регистрация</button>
        </div>
    </header>
    <body>
        <div class="auth-block">
            <h2 class="auth_title">Авторизация</h2>
            <form>
                <label class="auth-text" for="login">Логин</label>
                <input class="border" id="login" name="login" placeholder="Введите логин">
                <label class="auth-text" for="password">Пароль</label>
                <input  class="border" id="password" name="password" placeholder="Введите пароль">
                <div class="remember-me-container">
                    <input class="custom-check-icon" type="checkbox" id="remember-me" name="remember-me">
                    <label class="remember-me">Запомнить меня</label>
                </div>
                <button class="auth-button">Войти</button>
            </form>
        </div>
    </body>
    `,

    mount(router) {
        document.getElementById('signup-button').addEventListener('click', () => {
            router.goto('/signup');
        });
    },

    unmount() {

    },
};
