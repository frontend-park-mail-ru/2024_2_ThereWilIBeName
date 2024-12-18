import Api from '../../utils/Api';
import galleryPhotosTemplate from './trip-photos.hbs';

export default async function mountPhotos(galleryItem: Element, photos: any | undefined = undefined) {
    if (photos !== null) {
        galleryItem.innerHTML = galleryPhotosTemplate({photos});
    }
};
