import Search from '../../utils/search-memory';
import Router from '../../utils/Router';
import attractionsLoad from './attractions-load';

export default async function categoryButtonMount(categoryId: number, placeGallery: HTMLButtonElement, router: Router, button: HTMLButtonElement) {
    Search.categoryId === categoryId ? Search.categoryId = -1 : Search.categoryId = categoryId;
    button.classList.toggle('active');
    await attractionsLoad(placeGallery, router);
};
