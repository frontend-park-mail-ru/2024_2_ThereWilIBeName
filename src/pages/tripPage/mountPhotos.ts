import Api from '../../utils/Api';
import galleryPhotosTemplate from './trip-photos.hbs';

export default async function mountPhotos(galleryItem: Element, photos: { photoPath: string }[]) {
    if (photos.length !== 0) {
        galleryItem.innerHTML = galleryPhotosTemplate({photos});
    }
};
