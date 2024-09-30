import Api from '../utils/Api.js';

export default {
    html:
        `<header class="header">
            <div class="logo" >
                <img src="/src/static/logo.png" alt="Логотип" class="logo-image">
            </div>
            <div class="auth">
                <button class="login-button" id="signinButton">вход</button>
            </div>
        </header>
        <main>
            <div class="headline">
                Достопримечательности
            </div>
            <ul class="gallery" id="gallery">
                
            </ul>
             
        </main>
        <script id="gallery-item-template" type="text/x-handlebars-template">
            {{#each attractions}}
                <il class="gallery-item">
                    <img src="{{image}}" alt="{{name}}">
                    <p>{{name}}</p>
                </il>
            {{/each}}
        </script>`,

    async mount(router) {
        document.getElementById('signinButton').addEventListener('click', () => {
            router.goto('/signin');
        });

        const attractionsResponse = await Api.getAttractions();
        const attractions = attractionsResponse.data;

        const templateSource = document.getElementById('gallery-item-template').innerHTML;
        const template = Handlebars.compile(templateSource);

        document.getElementById('gallery').innerHTML = template({attractions});
    },

    unmount() {

    },
};
