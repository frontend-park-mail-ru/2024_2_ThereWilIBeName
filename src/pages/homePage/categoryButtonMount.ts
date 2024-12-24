import Search from '../../utils/search-memory';
import Router from '../../utils/Router';
import attractionsLoad from './attractions-load';

export default async function categoryButtonMount(categoryId: number, placeGallery: HTMLButtonElement, router: Router, button: HTMLButtonElement) {
    Search.categoryId === categoryId ? Search.categoryId = -1 : Search.categoryId = categoryId;

    if (Search.categoryActiveElement && Search.categoryActiveElement !== button) {
        Search.categoryActiveElement.classList.remove('active');
    }

    button.classList.toggle('active');
    Search.categoryActiveElement = button;

    await attractionsLoad(placeGallery, router);
};
