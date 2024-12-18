import Search from '../../utils/search-memory';
import Router from '../../utils/Router';
import attractionsLoad from './attractions-load';

export default async function categoryButtonMount(categoryId: number, placeGallery: HTMLButtonElement, router: Router, button: HTMLButtonElement) {
    Search.categoryId = categoryId ? Search.categoryId = -1 : Search.categoryId = categoryId;
    if (Search.categoryId !== -1) {
        const tempActiveButton = document.getElementById(Search.categoryActiveElement) as HTMLElement;
        tempActiveButton.classList.toggle('active');
    }
    button.classList.toggle('active');
    Search.categoryActiveElement = button.id;
    await attractionsLoad(placeGallery, router);
};
