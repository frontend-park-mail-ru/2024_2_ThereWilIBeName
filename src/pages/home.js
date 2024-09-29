import Api from '../utils/Api.js';

export default {
    html:
        `<header class="header">
            <div class="logo" >
                <img src="./src/static/logo.png" alt="Логотип" class="logo-image">
            </div>
            <div class="auth">
                <button class="login-button" id="signinButton">вход</button>
            </div>
        </header>
        <main>
            <div class="headline">
                <h1>Достопримечательности</h1>
            </div>
            <div class="gallery" id="gallery">
                
            </div>
             
        </main>
        <script id="gallery-item-template" type="text/x-handlebars-template">
            {{#each attractions}}
                <div class="gallery-item">
                    <img src="{{path}}" alt="{{title}}">
                    <p>{{title}}</p>
                </div>
            {{/each}}
        </script>`,

    async mount(router) {
        document.getElementById('signinButton').addEventListener('click', () => {
            router.goto('/signin');
        });

        const attractionsResponse = await Api.getAttractions();
        const attractions = attractionsResponse.data.images;

        const templateSource = document.getElementById('gallery-item-template').innerHTML;
        const template = Handlebars.compile(templateSource);

        document.getElementById('gallery').innerHTML = template({attractions});
    },

    unmount() {

    },
};
