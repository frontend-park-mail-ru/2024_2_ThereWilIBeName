import RESTApi from './RESTApi.js';

export default {
    /**
     * Асинхронная функция для получения списка достопримечательностей с сервера.
     *
     * @returns {Promise<{data: Object[], status: number, ok: boolean}>} Ответ сервера с данными достопримечательностей, статусом и флагом успеха.
     */
    async getAttractions() {
        const res = await RESTApi.get('/api/v1/places');
        return {
            data: res.data,
            status: res.status,
            ok: res.ok,
        };
    },

    getUser() {
        let ok = false;
        if (document.cookie) {
            ok = true;
        }
        return {
            ok
        };
    },

    /**
     * Асинхронная функция для авторизации пользователя (входа в систему).
     *
     * @param {string} username - Имя пользователя для авторизации.
     * @param {string} password - Пароль пользователя.
     * @returns {Promise<{data: Object, status: number, ok: boolean}>} Ответ сервера с результатом авторизации, статусом и флагом успеха.
     */
    async postSignin(username, password) {
        const res = await RESTApi.post('/api/v1/auth/login', {login: username, password});
        return {
            data: {},
            status: res.status,
            ok: res.ok,
        };
    },

    /**
     * Асинхронная функция для регистрации нового пользователя.
     *
     * @param {string} username - Имя пользователя для регистрации.
     * @param {string} password - Пароль пользователя.
     * @returns {Promise<{data: Object, status: number, ok: boolean}>} Ответ сервера с результатом регистрации, статусом и флагом успеха.
     */
    async postSignup(username, password) {
        const res = await RESTApi.post('/api/v1/auth/signup', {login: username, password});
        return {
            data: {},
            status: res.status,
            ok: res.ok,
        };
    }

};
