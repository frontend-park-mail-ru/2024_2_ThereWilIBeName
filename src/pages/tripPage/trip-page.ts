import Api from '../../utils/Api';
import User from '../../utils/user';
import Router from '../../utils/Router';
import header from '../../components/header';
import footer from '../../components/footer';
import backButtonIcon from '../../static/back button.svg';
import shareIcon from '../../static/share.svg';
import mountPhotos from './mountPhotos';
import showMessage from '../../components/message';
import galleryAuthorsTemplate from './authors.hbs';
import palmsImgB from '../../static/please black.svg';

export default {
    html:`
        ${header.html}
        <main>
            <div class="copy-message hidden hidden-animation" id="copy-message">Ссылка скопирована</div>
            <img src="${backButtonIcon}" alt="назад" class="trip-back-button grid-trip-back-button" id="trip-back-button">
            <div class="trip-title grid-trip-title" id="trip-title">Поездка</div>
            <img src="${shareIcon}" alt="поделиться" class="trip-share-icon grid-trip-share-icon" id="trip-share-button">
            <div class="trip-date grid-trip-date" id="trip-date">01.12.2024 - 08.12.2024</div>
            <div class="trip-description grid-trip-description" id="trip-description">Описание</div>
            <div class="trip-authors-gallery grid-trip-authors-gallery" id="trip-authors-gallery">
                <div class="please-block">
                    <img src="${palmsImgB}" class="please-img" alt="Пальма">
                    <div class="please-no-photo">Здесь будут фото</div>
                </div>
            </div>
            <div class="trip-gallery-photos grid-trip-gallery-photos">
                <div class="trip-photos" id="trip-photos">
                </div>
            </div>
        </main>
        ${footer.html}
`,
    async mount(router: Router, params: number): Promise<void> {

        // Монтирование хэдера
        await header.mount(router);

        const backButton = document.getElementById('trip-back-button') as HTMLButtonElement;
        backButton.addEventListener('click', () => {
            router.goto('/mytrips');
        });

        const itemId: number = params;
        const copyMessage = document.getElementById('copy-message') as HTMLElement;

        const tripTitle = document.getElementById('trip-title') as HTMLElement;
        const tripDate = document.getElementById('trip-date') as HTMLElement;
        const tripDescription = document.getElementById('trip-description') as HTMLElement;
        const tripAuthorsGallery = document.getElementById('trip-authors-gallery') as HTMLElement;

        try {
            const tripResponse = await Api.getTrip(itemId, User.id);
            tripTitle.textContent = tripResponse.data.trip.name;
            tripDate.textContent = `${tripResponse.data.trip.startDate} - ${tripResponse.data.trip.endDate}`;
            tripDescription.textContent = tripResponse.data.trip.description;
            const authors = tripResponse.data.users;
            tripAuthorsGallery.innerHTML = galleryAuthorsTemplate({ authors });


            if (tripResponse.data.userAdded) {
                showMessage('Поездка добавлена', copyMessage);
            }

            if (window.location.pathname !== `trips/${itemId}` && User.id === '') {
                showMessage('Авторизуйтесь для добавления поездки', copyMessage);
            }


        } catch (e) {
            console.log('Ошибка получения поездки');
        }
        
        const galleryPhoto = document.getElementById('trip-photos') as HTMLElement;
        if (!galleryPhoto) {
            console.log('Блок фото не найден');
            return;
        }

        await mountPhotos(galleryPhoto, itemId);

        const shareButton = document.getElementById('trip-share-button') as HTMLButtonElement;

        shareButton.addEventListener('click', () => {
            navigator.clipboard.writeText(`https://therewillbetrip.ru/trips/${itemId}`);
            showMessage('Ссылка скопирована', copyMessage);
        });
    },

    unmount(): void {}
};
