import Api from '../../utils/Api';
import User from '../../utils/user';
import galleryPhotosTemplate from './trips-photos.hbs';
import deleteIcon from '../../static/delete.png';
import deletePhotoButtonsMount from './mount-delete-photo-buttons';

export default async function mountPhotos(parentItem: Element) {
    const tempId = parentItem.id;
    const resPhotos = (await Api.getUserTrips(User.id)).data;
    resPhotos.forEach((trip) => {
        if (trip.id === tempId) {
            const newTripPhotos = trip.photos;
            const newGallery = parentItem.querySelector('.trip-photos') as HTMLElement;
            newGallery.innerHTML = galleryPhotosTemplate({newTripPhotos, deleteIcon});
            // Монтирование кнопок удаления фото
            deletePhotoButtonsMount(parentItem);
        }
    });
};
