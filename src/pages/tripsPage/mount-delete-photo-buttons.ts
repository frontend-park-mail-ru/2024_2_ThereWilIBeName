import Api from '../../utils/Api';
import mountPhotos from './mountPhotos';

export default function deletePhotoButtonsMount(parentItem: Element) {
    let deleteButtons = parentItem.querySelectorAll('.photo-delete-button');
    deleteButtons.forEach(deleteButton => {
        const deleteButtonElement = deleteButton as HTMLButtonElement;
        deleteButtonElement.addEventListener('click', async () => {
            const photoPath = deleteButtonElement.id;
            const resDeletePhoto = await Api.deletePhoto(parentItem.id, String(photoPath));
            if (!resDeletePhoto.ok) {
                console.log('Ошибка удаления фото');
            }
            await mountPhotos(parentItem);
        });
    });
};
