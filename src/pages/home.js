
export default {
    html:
        `<header class="header">
            <div class="logo" >
                <img src="./src/static/logo.png" alt="Логотип" class="logo-image">
            </div>
            <div class="auth">
                <button class="login-button" id="signin-button">вход</button>
            </div>
        </header>
        <body>
            <div class="headline">
                <h1>Достопримечательности</h1>
            </div>
            <div class="gallery">
                <div class="gallery-item">
                    <img src="logo.png" alt="Описание изображения 1">
                    <p>Подпись к изображению 1</p>
                </div>
                <div class="gallery-item">
                    <img src="logo.png" alt="Описание изображения 2">
                    <p>Подпись к изображению 2</p>
                </div>
                <div class="gallery-item">
                    <img src="logo.png" alt="Описание изображения 3">
                    <p>Подпись к изображению 3</p>
                </div>
                <div class="gallery-item">
                    <img src="logo.png" alt="Описание изображения 4">
                    <p>Подпись к изображению 4</p>
                </div>
                <div class="gallery-item">
                    <img src="logo.png" alt="Описание изображения 4">
                    <p>Подпись к изображению 4</p>
                </div>
                <div class="gallery-item">
                    <img src="logo.png" alt="Описание изображения 4">
                    <p>Подпись к изображению 4</p>
                </div>
        </body>`,

    mount(router) {
        document.getElementById('signin-button').addEventListener('click', () => {
            router.goto('/signin');
        });
    },

    unmount() {

    },
};
