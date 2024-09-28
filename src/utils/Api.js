import RESTApi from './RESTApi.js';

export default {

    async getAttractions() {
        return await RESTApi.get('/api/v1/places');
    },

    async postSignin(username, password) {
        return await RESTApi.post('/api/v1/user', {username: username, password: password});
    },

    async postSignup(username, password) {
        return await RESTApi.post('/api/v1/user', {username: username, password: password});
    }

};