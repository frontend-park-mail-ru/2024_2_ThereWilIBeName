console.log('Работает index.js');

const root = document.getElementById('root');
const menuContainer = document.createElement('menu');
const attractions = document.createElement('attractions');

root.appendChild(menuContainer);
root.appendChild(attractions);

const config = {
    menu: {
        home: {
            href: '/home',
            text: 'ДОСТОПРИМЕЧАТЕЛЬНОСТИ'
        },
        login: {
            href: '/login',
            text: 'АВТОРИЗАЦИЯ'
        },
        signup: {
            href: '/signup',
            text: 'РЕГИСТРАЦИЯ'
        }
    }
}

Object.entries(config.menu).forEach(([key, {href, text}]) => {
    const menuElement = document.createElement('a');
    menuElement.href = href;
    menuElement.textContent = text;

    menuContainer.appendChild(menuElement);
})
