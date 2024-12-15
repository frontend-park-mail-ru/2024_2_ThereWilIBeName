import Api from '../../utils/Api';
import Router from '../../utils/Router';
import header from '../../components/header';
import footer from '../../components/footer';
import backButtonIcon from '../../static/back button.svg';
import editIcon from '../../static/edit white.svg';
import shareIcon from '../../static/share.svg';
import mountPhotos from './mountPhotos';

export default {
    html:`
        ${header.html}
        <main>
            <img src="${backButtonIcon}" alt="назад" class="trip-back-button grid-trip-back-button" id="trip-back-button">
            <div class="trip-title grid-trip-title">Поездка</div>
            <img src="${editIcon}" alt="редактировать" class="trip-edit-icon grid-trip-edit-icon">
            <img src="${shareIcon}" alt="поделиться" class="trip-share-icon grid-trip-share-icon">
            <div class="trip-date grid-trip-date">01.12.2024 - 08.12.2024</div>
            <div class="trip-description grid-trip-description">Описание</div>
            <div class="trip-gallery-photos grid-trip-gallery-photos">
                <div class="add-photo-button" id="add-photo-button">Добавить фото</div>
                <div class="trip-photos">

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
        const tripResponse = await Api.getTrip(itemId);

        const tripTitle = document.getElementById('trip-title') as HTMLElement;
        tripTitle.textContent = tripResponse.data.name;

        const tripDate = document.getElementById('trip-date') as HTMLElement;
        tripDate.textContent = `${tripResponse.data.startDate} - ${tripResponse.data.endDate}`;

        const tripDescription = document.getElementById('trip-description') as HTMLElement;
        tripDescription.textContent = tripResponse.data.description;

        if (!tripResponse.ok) {
            console.log('Ошибка получения поездки');
            return;
        }
        
        const galleryPhoto = document.getElementById('trip-gallery-photos') as HTMLElement;
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

    },

    unmount(): void {}
};
