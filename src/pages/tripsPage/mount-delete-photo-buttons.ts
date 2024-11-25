import Api from '../../utils/Api';

export default function deletePhotoButtonsMount(parentItem: Element) {
    let deleteButtons = parentItem.querySelectorAll('.photo-delete-button');
    deleteButtons.forEach(deleteButton => {
        const deleteButtonElement = deleteButton as HTMLButtonElement;
        deleteButtonElement.addEventListener('click', async () => {
            const photoPathData = deleteButtonElement.dataset.photoPath;
            const resDeletePhoto = await Api.deletePhoto(parentItem.id, String(photoPathData));
            if (!resDeletePhoto.ok) {
                console.log('Ошибка удаления фото');
            }
        });
    });
};
