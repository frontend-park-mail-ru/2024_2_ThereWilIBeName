import Api from '../../utils/Api';
import Router from '../../utils/Router';
import header from '../../components/header';
import footer from '../../components/footer';
import backButtonIcon from '../../static/back button.svg';
import editIcon from '../../static/edit white.svg';
import shareIcon from '../../static/share.svg';
import mountPhotos from './mountPhotos';
import copyIcon from '../../static/copy.svg';

export default {
    html:`
        ${header.html}
        <main>
            <div class="copy-message hidden hidden-animation" id="copy-message">Ссылка скопирована</div>
            <div class="share-block hidden hidden-animation" id="share-block">
                <div class="share-block-title grid-share-block-title">Поделиться поездкой</div>
                <div class="share-link grid-share-link" id="share-link"></div>
                <img src="${copyIcon}" class="copy-link-button grid-copy-link-button" id="copy-link-button">
                <div class="read-mode grid-read-mode" id="read-mode-button">Чтение</div>
                <div class="edit-mode grid-edit-mode" id="edit-mode-button">Редактирование</div>
            </div>
            <div class="blur-element hidden hidden-animation" id="blur-element"></div>
            <img src="${backButtonIcon}" alt="назад" class="trip-back-button grid-trip-back-button" id="trip-back-button">
            <div class="trip-title grid-trip-title">Поездка</div>
            <img src="${editIcon}" alt="редактировать" class="trip-edit-icon grid-trip-edit-icon">
            <img src="${shareIcon}" alt="поделиться" class="trip-share-icon grid-trip-share-icon" id="trip-share-button">
            <div class="trip-date grid-trip-date">01.12.2024 - 08.12.2024</div>
            <div class="trip-description grid-trip-description">Описание</div>
            <div class="trip-gallery-photos grid-trip-gallery-photos">
                <div class="add-photo-button" id="add-photo-button">Добавить фото</div>
                <div class="trip-photos" id="trip-photos">

                </div>
            </div>
        </main>
        ${footer.html}
`,
    async mount(router: Router, params: any): Promise<void> {

        // Монтирование хэдера
        await header.mount(router);

        const backButton = document.getElementById('trip-back-button') as HTMLButtonElement;
        backButton.addEventListener('click', () => {
            router.goto('/trips');
        });

        const itemId: number = Number(params);

        const tripTitle = document.getElementById('trip-title') as HTMLElement;
        const tripDate = document.getElementById('trip-date') as HTMLElement;
        const tripDescription = document.getElementById('trip-description') as HTMLElement;

        try {
            const tripResponse = await Api.getTrip(itemId);
            tripTitle.textContent = tripResponse.data.name;
            tripDate.textContent = `${tripResponse.data.startDate} - ${tripResponse.data.endDate}`;
            tripDescription.textContent = tripResponse.data.description;
        } catch (e) {
            console.log('Ошибка получения поездки');
        }
        
        const galleryPhoto = document.getElementById('trip-photos') as HTMLElement;
        if (!galleryPhoto) {
            console.log('Блок фото не найден');
            return;
        }

        await mountPhotos(galleryPhoto, itemId);

        const addPhotoButton = document.getElementById('add-photo-button') as HTMLButtonElement;
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

                    const res = await Api.putPhotos(String(itemId), base64Photos);
                    if (!res.ok) {
                        alert('Ошибка загрузки фото');
                        return;
                    }

                    // Получаем список фотографий
                    await mountPhotos(galleryPhoto, itemId);
                }
            });

            tripPhotoInputElement.click();
        });

        const shareButton = document.getElementById('trip-share-button') as HTMLButtonElement;
        const shareBlock = document.getElementById('share-block') as HTMLElement;
        const blurElement = document.getElementById('blur-element') as HTMLElement;
        shareButton.addEventListener('click', () => {
            shareBlock.classList.remove('hidden');
            shareBlock.classList.remove('hidden-animation');
            blurElement.classList.remove('hidden');
            blurElement.classList.remove('hidden-animation');
        });
        blurElement.addEventListener('click', () => {
            shareBlock.classList.add('hidden-animation');
            shareBlock.classList.add('hidden');
            blurElement.classList.add('hidden-animation');
            blurElement.classList.add('hidden');
        });

        const copyLinkButton = document.getElementById('copy-link-button') as HTMLButtonElement;
        const shareLinkElement = document.createElement('share-link') as HTMLElement;
        const copyMessage = document.getElementById('copy-message') as HTMLElement;
        copyLinkButton.addEventListener('click', () => {
            if (shareLinkElement.textContent) {
                navigator.clipboard.writeText(shareLinkElement.textContent);
                copyMessage.classList.remove('hidden');
                copyMessage.classList.remove('hidden-animation');
                setTimeout(() => {
                    copyMessage.classList.add('hidden-animation');
                    copyMessage.classList.add('hidden');
                }, 3000);
            }
        });

        const readModeButton = document.getElementById('read-mode-button') as HTMLButtonElement;
        readModeButton.addEventListener('click', async () => {
            const resReadMode = await Api.getTripLink(itemId, 'reading');
            shareLinkElement.textContent = resReadMode.data.link;
        });

        const editModeButton = document.getElementById('edit-mode-button') as HTMLButtonElement;
        editModeButton.addEventListener('click', async () => {
            const resEditMode = await Api.getTripLink(itemId, 'editing');
            shareLinkElement.textContent = resEditMode.data.link;
        });
    },

    unmount(): void {}
};
