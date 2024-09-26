console.log('Работает index.js');

const root = document.getElementById('root');
const menuContainer = document.createElement('menu');
const pageContainer = document.createElement('main');

root.appendChild(menuContainer);
root.appendChild(pageContainer);

const config = {
    menu: {
        home: {
            href: '/home',
            text: 'ДОСТОПРИМЕЧАТЕЛЬНОСТИ',
            render: renderHome
        },
        login: {
            href: '/login',
            text: 'АВТОРИЗАЦИЯ',
            render: renderLogin
        },
        signup: {
            href: '/signup',
            text: 'РЕГИСТРАЦИЯ',
            render: renderSignup
        }
    }
};

const state = {
    activePageLink: null
};

function renderMenu(){
    Object.entries(config.menu).forEach(([key, {href, text}], index) => {
        const menuElement = document.createElement('a');
        menuElement.href = href;
        menuElement.textContent = text;
        menuElement.dataset.section = key;
    
        if (index === 0){
            menuElement.classList.add('active')
            state.activePageLink = menuElement;
        }
    
        menuContainer.appendChild(menuElement);
    })
}

function createInput(type,text,name){
    const input = document.createElement('input');
    input.type = type;
    input.name = name;
    input.placeholder = text;

    return input;
}

const loginLink = root.querySelector('[data-section="login"]');
const signUpLink = root.querySelector('[data-section="signup"]');
const homeLink = root.querySelector('[data-section="home"]');


function renderLogin(){
    const form = document.createElement('form')

    const emailInput = createInput('email', 'введите email', 'email');
    const passwordInput = createInput('password', 'пароль', 'password');

    const submitBtn = document.createElement('input');

    submitBtn.type = 'submit';
    submitBtn.value = 'войти';

    form.appendChild(emailInput);
    form.appendChild(passwordInput);
    form.appendChild(submitBtn);

    return form;
}

function renderSignup(){
    const form = document.createElement('form')

    const emailInput = createInput('email', 'введите email', 'email');
    const passwordInput = createInput('password', 'пароль', 'password');
    const ageInput = createInput('number', 'возраст', 'age');

    const submitBtn = document.createElement('input');

    submitBtn.type = 'submit';
    submitBtn.value = 'Зарегестрироваться';

    form.appendChild(emailInput);
    form.appendChild(passwordInput);
    form.appendChild(ageInput);
    form.appendChild(submitBtn);

    return form;
}

function renderHome(){
    const homeContainer = document.createElement('div')

    homeContainer.textContent = 'Достопримечательности'

    return homeContainer;
}


menuContainer.addEventListener('click', (event) => {
    const {target} = event;

    if (target.tagName.toLowerCase() === 'a') {
        event.preventDefault();

        pageContainer.innerHTML = '';

        state.activePageLink.classList.remove('active');
        target.classList.add('active');
        state.activePageLink = target;

        const newPageElement = config.menu[target.dataset.section].render();

        pageContainer.appendChild(newPageElement);
    }

})

renderMenu();
pageContainer.appendChild(renderHome());
