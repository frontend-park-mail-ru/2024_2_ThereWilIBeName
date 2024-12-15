import Api from '../../utils/Api';
import galleryPhotosTemplate from '../tripPage/trips-photos.hbs';
import deleteIcon from '../../static/delete.png';
import deletePhotoButtonsMount from './mount-delete-photo-buttons';

export default async function mountPhotos(galleryItem: Element, itemId: number) {
    const resTrip = await Api.getTrip(itemId);
    if (resTrip) {
        const newTripPhotos = resTrip.data.photos;
        galleryItem.innerHTML = galleryPhotosTemplate({newTripPhotos, deleteIcon});
        // Монтирование кнопок удаления фото
        deletePhotoButtonsMount(galleryItem, itemId);
    }
};
