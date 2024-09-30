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
            data:
                [
                    {
                        'id': 1,
                        'image': 'https://cdn.tripster.ru/thumbs2/725b6ada-9815-11ed-87d9-ee8b4c069e8d.1220x600.jpeg',
                        'name': 'Московский Кремль',
                        'description': 'Московский Кремль'
                    },
                    {
                        'id': 1,
                        'image': 'https://cdn.tripster.ru/thumbs2/725b6ada-9815-11ed-87d9-ee8b4c069e8d.1220x600.jpeg',
                        'name': 'Московский Кремль',
                        'description': 'Московский Кремль'
                    },
                    {
                        'id': 1,
                        'image': 'https://cdn.tripster.ru/thumbs2/725b6ada-9815-11ed-87d9-ee8b4c069e8d.1220x600.jpeg',
                        'name': 'Московский Кремль',
                        'description': 'Московский Кремль'
                    },
                    {
                        'id': 1,
                        'image': 'https://cdn.tripster.ru/thumbs2/725b6ada-9815-11ed-87d9-ee8b4c069e8d.1220x600.jpeg',
                        'name': 'Московский Кремль',
                        'description': 'Московский Кремль'
                    },
                    {
                        'id': 1,
                        'image': 'https://cdn.tripster.ru/thumbs2/725b6ada-9815-11ed-87d9-ee8b4c069e8d.1220x600.jpeg',
                        'name': 'Московский Кремль',
                        'description': 'Московский Кремль'
                    },
                    {
                        'id': 1,
                        'image': 'https://cdn.tripster.ru/thumbs2/725b6ada-9815-11ed-87d9-ee8b4c069e8d.1220x600.jpeg',
                        'name': 'Московский Кремль',
                        'description': 'Московский Кремль'
                    },
                    {
                        'id': 1,
                        'image': 'https://cdn.tripster.ru/thumbs2/725b6ada-9815-11ed-87d9-ee8b4c069e8d.1220x600.jpeg',
                        'name': 'Московский Кремль',
                        'description': 'Московский Кремль'
                    },
                    {
                        'id': 1,
                        'image': 'https://cdn.tripster.ru/thumbs2/725b6ada-9815-11ed-87d9-ee8b4c069e8d.1220x600.jpeg',
                        'name': 'Московский Кремль',
                        'description': 'Московский Кремль'
                    },
                    {
                        'id': 1,
                        'image': 'https://cdn.tripster.ru/thumbs2/725b6ada-9815-11ed-87d9-ee8b4c069e8d.1220x600.jpeg',
                        'name': 'Московский Кремль',
                        'description': 'Московский Кремль'
                    }

                ],
            status: '200',
            ok: 'ok'
        };
    },

    async postSignin(username, password) {
        const res = await RESTApi.post('/api/v1/auth/login', {login: username, password});
        return {
            data: {},
            status: res.status,
            ok: res.ok,
        };
    },

    async postSignup(username, password) {
        const res = await RESTApi.post('/api/v1/auth/signup', {login: username, password});
        return {
            data: {},
            status: res.status,
            ok: res.ok,
        };
    }

};
