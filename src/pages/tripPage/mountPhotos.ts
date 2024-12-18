import Api from '../../utils/Api';
import galleryPhotosTemplate from './trip-photos.hbs';

export default async function mountPhotos(galleryItem: Element, itemId: number) {
    const resTrip = await Api.getTrip(itemId);
    if (resTrip) {
        const newTripPhotos = resTrip.data.trip.photos;
        galleryItem.innerHTML = galleryPhotosTemplate({newTripPhotos});
    }
};
