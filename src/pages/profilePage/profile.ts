import Router from '../../utils/Router';
import Api from '../../utils/Api';
import User from '../../utils/user';
import updateMenu from './profileMenu';

import logoImage from '../../static/logo trip.svg';
import defaultAvatar from '../../static/avatar.png';
import editButton from '../../static/edit.svg';
import confirmIcon from '../../static/confirm.svg';
import {emailRegex} from '../../components/validation';
import footer from '../../components/footer';
import backButton from '../../static/back button white.svg';
import userMount from '../../components/user-mount';
import closeButton from '../../static/close icon.svg';

export default {
    /**
     * HTML-шаблон для страницы профиля с предупреждающим сообщением и кнопкой
     * для перехода на главную страницу.
     *
     * @type {string}
     */
    html: `
        <img src="${logoImage}" alt="Логотип" class="logo-image" id="logo-image">
        <div class="error-window-message hidden hidden-animation" id="error-window-message">Ошибка загрузки аватарки
            <img src="${closeButton}" class="error-close-button" id="error-close-button">
        </div>
        <main>
            <div class="background-profile">
                <div class="user-block">
                    <img src="${backButton}" class="information-back-button back-button-grid" id="back-button">
                    <img src="" alt="Аватар" class="avatar avatar-grid" id="avatar">
                    <div class="information-block information-block-grid">
                        <div class="information-text-bold username-grid" >Имя</div>
                        <div class="information-text username-input-grid" id="user-username">Здесь будет username</div>
                        <input class="edit-profile-input username-input-grid hidden" type="text" id="username-input">
                        <img src="${editButton}" alt="edit" class="edit-button edit-button-grid" id="edit-button">
                        <div class="information-text-bold email-grid">Email</div>
                        <div class="information-text email-input-grid" id="user-email">Здесь будет email</div>
                        <input class="edit-profile-input email-input-grid hidden" type="text" id="email-input">
                        <div class="information-text-bold id-grid" >ID</div>
                        <div class="information-text id-input-grid" id="user-id">Здесь будет id</div>
                        <img src="${confirmIcon}" alt="confirm" class="submit-edit-button submit-grid hidden" id="submit-edit-button">
                    </div>
                    <div class="information-title-block information-title-block-grid">
                        <div class="information-text-title" id="user-title">Здесь будет Username</div>
                    </div>
                    <div class="change-password-button change-password-button-grid" id="change-password-button">Сменить пароль</div>

                    <div></div>
                </div>
                <div class="profile-block">
                    <div class="profile-menu-row">
                        <div class="profile-menu-passive-left" id="left-menu-button">Достижения</div>
                        <div class="profile-menu-active" id="active-menu-button">Поездки</div>
                        <div class="profile-menu-passive-right" id="right-menu-button">Отзывы</div>      
                    </div>
                    <hr>
                    <div>
                        <div id="profile-root">
                            <ul class="gallery-profile" id="gallery-profile">Здесь будут ваши поездки</ul>
                        </div>
                    </div>
                </div>
            </div>
        </main>
        ${footer.html}
`,

    /**
     * Функция для монтирования страницы профиля, которая добавляет обработчик события
     * на кнопку для перехода на главную страницу.
     *
     * @async
     * @param {Router} router - Экземпляр класса Router для управления навигацией между страницами.
     * @returns {Promise<void>} Промис, который выполняется после установки обработчика события.
     */
    async mount(router: Router): Promise<void> {
        const homeLogo = document.getElementById('logo-image') as HTMLElement;
        homeLogo.addEventListener('click', () => {
            router.goto('/home');
        });

        const backButton = document.getElementById('back-button') as HTMLButtonElement;
        backButton.addEventListener('click', () => {
            router.goto('/home');
        });

        const changePasswordButton = document.getElementById('change-password-button') as HTMLButtonElement;
        changePasswordButton.addEventListener('click', () => {
            router.goto('/changepassword');
        });

        // Проверка информации о текущем пользователе

        if (User.username === '') {
            const currentUser = await Api.getUser();
            User.username = currentUser.data.profile.username;
            User.id = currentUser.data.id;
            User.email = currentUser.data.profile.email;
        }

        const userTitle = document.getElementById('user-title') as HTMLElement;
        const userUserName = document.getElementById('user-username') as HTMLElement;
        const userEmail = document.getElementById('user-email') as HTMLElement;
        const userId = document.getElementById('user-id') as HTMLElement;

        const resProfile = await Api.getProfile(User.id);
        userTitle.textContent = resProfile.data.username.charAt(0).toUpperCase() + resProfile.data.username.slice(1);
        userUserName.textContent = resProfile.data.username;
        userEmail.textContent = resProfile.data.email;
        userId.textContent = User.id;
        const avatar = document.getElementById('avatar') as HTMLImageElement;
        avatar.src = resProfile.data.avatarPath ?
            `/avatars/${resProfile.data.avatarPath}` : defaultAvatar;

        const errorWindowMessage = document.getElementById('error-window-message') as HTMLElement;
        const errorCloseButton = document.getElementById('error-close-button') as HTMLButtonElement;

        errorCloseButton.addEventListener('click', () => {
            errorWindowMessage.classList.add('hidden-animation');
            setTimeout(() => errorWindowMessage.classList.add('hidden'), 300);
        });

        avatar.addEventListener('click', () => {
            const avatarInputElement = document.createElement('input') as HTMLInputElement;
            avatarInputElement.type = 'file';
            avatarInputElement.accept = 'image/*'; // Ограничиваем тип файлов на изображения
            avatarInputElement.style.display = 'none';

            avatarInputElement.addEventListener('change', () => {
                if (avatarInputElement.files) {
                    const newAvatar = avatarInputElement.files[0];
                    const reader = new FileReader();
                    reader.addEventListener('load', async () => {
                        const basedAvatar = String(reader.result ? reader.result : '');
                        if (!basedAvatar) {
                            errorWindowMessage.classList.remove('hidden');
                            setTimeout(() => errorWindowMessage.classList.remove('hidden-animation'), 100);
                            return;
                        }
                        const res = await Api.putAvatar(User.id, basedAvatar);
                        if (!res.ok) {
                            errorWindowMessage.classList.remove('hidden');
                            setTimeout(() => errorWindowMessage.classList.remove('hidden-animation'), 100);
                            return;
                        }
                        await this.mount(router);
                    });
                    reader.readAsDataURL(newAvatar);
                }
            });

            avatarInputElement.click();
        });

        const editButton = document.getElementById('edit-button') as HTMLButtonElement;
        const submitEditButton = document.getElementById('submit-edit-button') as HTMLButtonElement;
        const usernameInput = document.getElementById('username-input') as HTMLInputElement;

        if (userUserName.textContent) {
            usernameInput.value = userUserName.textContent;
        }
        const emailInput = document.getElementById('email-input') as HTMLInputElement;
        if (userEmail.textContent) {
            emailInput.value = userEmail.textContent;
        }


        editButton.addEventListener('click', () => {
            editButton.classList.toggle('active');
            submitEditButton.classList.toggle('hidden');
            usernameInput.classList.toggle('hidden');
            userUserName.classList.toggle('hidden');
        });

        submitEditButton.addEventListener('click', async () => {
            const formUsername = (document.getElementById('username-input') as HTMLInputElement).value.trim();
            const formEmail = (document.getElementById('email-input') as HTMLInputElement).value.trim().toLowerCase();

            if (!emailRegex.test(formEmail)) {
                console.log('Неверный email');
                return;
            }

            const res = await Api.putUserInformation(User.id, formUsername, formEmail);

            if (!res.ok) {
                console.log('Ошибка изменения данных пользователя');
            }

            await userMount();
            await router.goto('/profile');

        });

        const leftMenuButton = document.getElementById('left-menu-button') as HTMLButtonElement;
        const rightMenuButton = document.getElementById('right-menu-button') as HTMLButtonElement;
        const activeMenuButton = document.getElementById('active-menu-button') as HTMLButtonElement;
        let leftMenuText = leftMenuButton.textContent as string;
        let rightMenuText = rightMenuButton.textContent as string;
        let centerMenuText = activeMenuButton.textContent as string;

        leftMenuButton.addEventListener('click', () => {
            leftMenuButton.textContent = rightMenuText;
            rightMenuButton.textContent = centerMenuText;
            activeMenuButton.textContent = leftMenuText;
            updateMenu(activeMenuButton);
            leftMenuText = leftMenuButton.textContent;
            rightMenuText = rightMenuButton.textContent;
            centerMenuText = activeMenuButton.textContent;
        });

        rightMenuButton.addEventListener('click', () => {
            leftMenuButton.textContent = centerMenuText;
            rightMenuButton.textContent = leftMenuText;
            activeMenuButton.textContent = rightMenuText;
            updateMenu(activeMenuButton);
            leftMenuText = leftMenuButton.textContent;
            rightMenuText = rightMenuButton.textContent;
            centerMenuText = activeMenuButton.textContent;
        });

        await updateMenu(activeMenuButton);

    },

    /**
     * Функция размонтирования страницы профиля.
     * Используется для очистки состояния или удаления обработчиков событий при переходе на другую страницу.
     */
    unmount() {
    },
};
