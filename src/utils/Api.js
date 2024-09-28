import RESTApi from './RESTApi.js';

export default {

    async getAttractions() {
        const res = await RESTApi.get('/api/v1/places');
        const attractions = res.json();
        return attractions.images;
    },

    async postSignin(username, password) {
        const res = await RESTApi.post('/api/v1/user', {username: username, password: password});
        const profile = res.json();
        return {
            data: profile.data,
            status: profile.status,
        };
    },

    async postSignup(username, password) {
        const res = await RESTApi.post('/api/v1/user', {username: username, password: password});
        const profile = res.json();
        return {
            data: profile.data,
            status: profile.status,
        };
    }

};