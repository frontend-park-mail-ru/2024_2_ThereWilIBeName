import RESTApi from './RESTApi.js';

export default {

    async getAttractions() {
        // const res = await RESTApi.get('/api/v1/places');
        // return {
        //     data: res.data,
        //     status: res.status,
        //     ok: res.ok,
        // };

        return {
            data: {
                'images': [
                    {
                        'path': 'https://cdn.tripster.ru/thumbs2/725b6ada-9815-11ed-87d9-ee8b4c069e8d.1220x600.jpeg',
                        'title': 'Московский Кремль'
                    },
                    {
                        'path': 'https://cdn.tripster.ru/thumbs2/725b6ada-9815-11ed-87d9-ee8b4c069e8d.1220x600.jpeg',
                        'title': 'Красная Площадь'
                    },
                    {
                        'path': 'https://cdn.tripster.ru/thumbs2/725b6ada-9815-11ed-87d9-ee8b4c069e8d.1220x600.jpeg',
                        'title': 'Храм Василия Блаженного'
                    },
                    {
                        'path': 'https://cdn.tripster.ru/thumbs2/725b6ada-9815-11ed-87d9-ee8b4c069e8d.1220x600.jpeg',
                        'title': 'Большой театр'
                    },
                    {
                        'path': 'https://cdn.tripster.ru/thumbs2/725b6ada-9815-11ed-87d9-ee8b4c069e8d.1220x600.jpeg',
                        'title': 'Государственная Третьяковская галерея'
                    },
                    {
                        'path': 'https://cdn.tripster.ru/thumbs2/725b6ada-9815-11ed-87d9-ee8b4c069e8d.1220x600.jpeg',
                        'title': 'Государственный музей Петергоф'
                    }
                ]
            },
            status: '200',
            ok: 'ok'
        };
    },

    async postSignin(body) {
        const res = await RESTApi.post('/api/v1/user', body);
        return {
            data: res.data,
            status: res.status,
            ok: res.ok,
        };
    },

    async postSignup(body) {
        const res = await RESTApi.post('/api/v1/user', body);
        return {
            data: res.data,
            status: res.status,
            ok: res.ok,
        };
    }

};