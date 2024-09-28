
export default {
    html:
        `
        <header class="header">
            <div class="logo">
                <img src="logo.png" alt="Логотип" class="logo-image"> <!-- Замените "logo.png" на путь к вашему логотипу -->
            </div>
            <div class="auth">
                <button class="login-button" id="signin-button">вход</button>
            </div>
        </header>
        <main>
        <div class="reg-block">
            <h2 class="auth_title">Регистрация</h2>
            <form>
                <label class="auth-text" for="login">Логин</label>
                <input class="border" id="login" name="login" placeholder="Введите логин">
                <label class="auth-text" for="password">Пароль</label>
                <input  class="border" id="password" name="password" placeholder="Введите пароль">
                <label class="auth-text" for="password_confirm">Подтверждение пароля</label>
                <input  class="border" id="password_confirm" name="password_confirm" placeholder="Повторите пароль">
                <button class="auth-button">зарегистрироваться</button>
            </form>
        </div>
        
        </main>
    `,

    mount(router) {
        document.getElementById('signin-button').addEventListener('click', () => {
            router.goto('/signin');
        });
    },

    unmount() {

    },
};
