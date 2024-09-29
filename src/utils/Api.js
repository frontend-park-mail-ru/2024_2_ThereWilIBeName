import RESTApi from './RESTApi.js';

export default {

    async getAttractions() {
        const res = await RESTApi.get('/api/v1/places');
        return {
            data: res.data,
            status: res.status,
            ok: res.ok,
        };
    },

    async postSignin(body) {
        const res = await RESTApi.post('/api/v1/auth/login', body);
        return {
            data: res.data,
            status: res.status,
            ok: res.ok,
        };
    },

    async postSignup(body) {
        const res = await RESTApi.post('/api/v1/auth/signup', body);
        return {
            data: res.data,
            status: res.status,
            ok: res.ok,
        };
    }

};
