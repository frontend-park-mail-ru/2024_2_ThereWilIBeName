import Router from '../../utils/Router';
import galleryTemplateTrips from './trips.hbs';
import Api from '../../utils/Api';

import openIcon from '../../static/open.png';
import tripIcon from '../../static/trip_icon.png';
import copyLinkIcon from '../../static/copy.svg';
import deleteIconWhite from '../../static/delete white.svg';
import editIcon from '../../static/edit white.svg';
import palmsImg from '../../static/please white.svg';
import User from '../../utils/user';
import header from '../../components/header';
import backButton from '../../static/back button white.svg';
import footer from '../../components/footer';
import deletePhotoButtonsMount from './mount-delete-photo-buttons';
import mountPhotos from './mountPhotos';
import popUpMessage from '../../components/pop-up-message';

export default {
    /**
     * HTML-шаблон для страницы профиля с предупреждающим сообщением и кнопкой
     * для перехода на главную страницу.
     *
     * @type {string}
     */
    html: `
        ${header.html}
        ${popUpMessage.html}
            
        <div class="share-block hidden hidden-animation" id="share-block">
            <div class="share-block-title grid-share-block-title">Поделиться поездкой</div>
            <div class="share-link grid-share-link" id="share-link"></div>
            <div class="read-mode grid-read-mode" id="read-mode-button">Чтение</div>
            <div class="edit-mode grid-edit-mode" id="edit-mode-button">Редактирование</div>
        </div>
        <div class="blur-element hidden hidden-animation" id="blur-element"></div>
        
        <main>
            <div class="trips-block">
                <div class="trips-title-row">
                    <img src="${backButton}" class="trips-back-button" alt="Назад" id="back-button">
                    <div class="trips-title">Поездки</div>
                </div>
                <hr>
                <div class="trips-button-row">
                    <div class="trip-create-button hidden" id="trip-create-button">+</div>
                </div>
                <div id="trips-root">
                    <div class="please-block hidden" id="please-block">
                        <img src="${palmsImg}" alt="Пожалуйста, авторизуйтесь" class="please-img">
                        <div class="auth-please" id="auth-please">Пожалуйста, авторизуйтесь</div>
                    </div>
                    <ul class="gallery-trips" id="gallery-trips"></ul>
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
        const backButton = document.getElementById('back-button') as HTMLButtonElement;
        const createTripButton = document.getElementById('trip-create-button') as HTMLButtonElement;
        const authPleaseBlock = document.getElementById('please-block') as HTMLElement;

        // Монтирование хэдера
        await header.mount(router);

        backButton.addEventListener('click', () => {
            router.goto('/home');
        });

        createTripButton.addEventListener('click', () => {
            router.goto('/createtrip');
        });

        if (!User.isSignedIn) {
            authPleaseBlock.classList.remove('hidden');
            return;
        }

        createTripButton.classList.remove('hidden');
        const tripsResponse = await Api.getUserTrips(User.id);

        if (!tripsResponse.ok) {
            console.log('Ошибка получения поездок');
            return;
        }
        const trips = tripsResponse.data;
        const galleryProfileElement = document.getElementById('gallery-trips') as HTMLElement;
        galleryProfileElement.innerHTML = galleryTemplateTrips({ trips, openIcon, tripIcon, copyLinkIcon, deleteIconWhite, palmsImg, editIcon });

        document.querySelectorAll('.trips-open-icon').forEach(icon => {
            const parentItem = icon.closest('.gallery-item-trips');
            if (!parentItem) {
                console.log('Родитель не найден');
                return;
            }
            const bottomPanel = parentItem.querySelector('.gallery-item-trips-bottom-panel');
            if (!bottomPanel) {
                console.log('Галерея не найден');
                return;
            }

            // Блок монтирования кнопок удаления фото
            deletePhotoButtonsMount(parentItem);

            const addPhotoButton = bottomPanel.querySelector('.add-photo-button') as HTMLButtonElement;
            icon.addEventListener('click', async () => {
                icon.classList.toggle('open');
                if (parentItem) {
                    parentItem.classList.toggle('open');
                    if (bottomPanel) {
                        if (!bottomPanel.classList.contains('open')) {
                            bottomPanel.classList.remove('hidden');
                            await new Promise(resolve => setTimeout(resolve, 200));
                            bottomPanel.classList.remove('hidden-animation');
                        } else {
                            bottomPanel.classList.add('hidden-animation');
                            await new Promise(resolve => setTimeout(resolve, 200));
                            bottomPanel.classList.add('hidden');
                        }
                    }
                }
            });

            addPhotoButton.addEventListener('click', async () => {
                const tripPhotoInputElement = document.createElement('input') as HTMLInputElement;
                tripPhotoInputElement.type = 'file';
                tripPhotoInputElement.accept = 'image/*'; // Ограничиваем тип файлов на изображения
                tripPhotoInputElement.multiple = true; // Разрешаем выбирать несколько фото
                tripPhotoInputElement.style.display = 'none';

                tripPhotoInputElement.addEventListener('change', async () => {
                    if (tripPhotoInputElement.files) {
                        const files = tripPhotoInputElement.files;
                        const base64Photos: string[] = [];

                        for (let i = 0; i < files.length; i++) {
                            const file = files[i];
                            const reader = new FileReader();

                            // Используем промисы для ожидания конвертации
                            const base64 = await new Promise<string>((resolve, reject) => {
                                reader.onload = () => resolve(String(reader.result));
                                reader.onerror = () => reject('Ошибка чтения файла');
                                reader.readAsDataURL(file);
                            });

                            base64Photos.push(base64);
                        }

                        const res = await Api.postPhotos(parentItem.id, base64Photos);
                        if (!res.ok) {
                            alert('Ошибка загрузки фото');
                            return;
                        }

                        // Получаем список фотографий
                        await mountPhotos(parentItem);
                    }
                });

                tripPhotoInputElement.click();
            });
        });

        document.querySelectorAll('.trips-delete-icon').forEach(icon => {
            icon.addEventListener('click', async () => {
                const parentItem = icon.closest('.gallery-item-trips');
                if (parentItem) {
                    const id = parentItem.id;
                    const res = await Api.deleteTrip(id);
                    if (res.ok) {
                        await router.goto('/mytrips');
                    }
                }
            });
        });


        document.querySelectorAll('.trips-edit-icon').forEach(icon => {
            icon.addEventListener('click', async () => {
                const parentItem = icon.closest('.gallery-item-trips');
                if (parentItem) {
                    const id = parentItem.id;
                    await router.goto(`/edittrip/${id}`);
                }
            });
        });

        const shareBlock = document.getElementById('share-block') as HTMLElement;
        const shareLink = document.getElementById('share-link') as HTMLElement;
        const readModeButton = document.getElementById('read-mode-button') as HTMLButtonElement;
        const editModeButton = document.getElementById('edit-mode-button') as HTMLButtonElement;
        let id = '';
        readModeButton.addEventListener('click', () => {
            shareLink.textContent = `therewillbetrip.ru/trips/${id}`;
            navigator.clipboard.writeText(`therewillbetrip.ru/trips/${id}`);
            popUpMessage.showMessage('Ссылка скопирована');
        });
        editModeButton.addEventListener('click', async () => {
            const resLink = await Api.postTripLink(id, 'editing');
            shareLink.textContent = resLink.data.link;
            navigator.clipboard.writeText(resLink.data.link);
            popUpMessage.showMessage('Ссылка скопирована');
        });

        const blurElement = document.getElementById('blur-element') as HTMLElement;
        blurElement.addEventListener('click', () => {
            shareBlock.classList.add('hidden-animation');
            setTimeout(() => shareBlock.classList.add('hidden'), 300);
            blurElement.classList.add('hidden-animation');
            setTimeout(() => blurElement.classList.add('hidden'), 300);
        });

        document.querySelectorAll('.trips-share-icon').forEach(icon => {
            icon.addEventListener('click', async () => {
                const parentItem = icon.closest('.gallery-item-trips');
                if (parentItem) {
                    id = parentItem.id;
                    blurElement.classList.remove('hidden');
                    setTimeout(() => blurElement.classList.remove('hidden-animation'), 100);
                    shareBlock.classList.remove('hidden');
                    setTimeout(() => shareBlock.classList.remove('hidden-animation'), 100);
                    shareLink.textContent = `therewillbetrip.ru/trips/${id}`;
                    navigator.clipboard.writeText(`therewillbetrip.ru/trips/${id}`);
                    popUpMessage.showMessage('Ссылка скопирована');
                }
            });
        });

        document.querySelectorAll('.gallery-trips-name').forEach(name => {
            name.addEventListener('click', async () => {
                const parentItem = name.closest('.gallery-item-trips');
                if (parentItem) {
                    await router.goto(`/trips/${parentItem.id}`);
                }
            });
        });
    },

    /**
     * Функция размонтирования страницы профиля.
     * Используется для очистки состояния или удаления обработчиков событий при переходе на другую страницу.
     */
    unmount() {
    },
};
