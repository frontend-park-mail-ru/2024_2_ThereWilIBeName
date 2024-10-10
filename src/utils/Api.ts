import RESTApi from './RESTApi';

type JsonResponse<T> = {
    data: T,
    status: number,
    ok: boolean,
}

type Attraction = {
    id: string,
    name: string,
    image: string,
    description: string,
    rating: number,
    numberOfReviews: number,
    address: string,
    city: string,
    phoneNumber: string,
    category: string,
}

type User = {
    id: string,
    username: string,
    email: string,
}

type Login = {
    //что-то возвращают
}

type Logout = {
    //что-то возвращает
}

export default {
    /**
     * Асинхронная функция для получения списка достопримечательностей с сервера.
     *
     * @returns {Promise<{data: Object[], status: number, ok: boolean}>} Ответ сервера с данными достопримечательностей, статусом и флагом успеха.
     */
    async getAttractions(): Promise<JsonResponse<Attraction>> {
        const res = await RESTApi.get('/api/v1/places');
        return {
            data: {
                id: String(res.data.id),
                name: String(res.data.name),
                image: String(res.data.image),
                description: String(res.data.description),
                rating: Number(res.data.rating),
                numberOfReviews: Number(res.data.numberOfReviews),
                address: String(res.data.address),
                city: String(res.data.city),
                phoneNumber: String(res.data.phoneNumber),
                category: String(res.data.category),
            },
            status: res.status,
            ok: res.ok,
        };
    },

    async getUser(): Promise<JsonResponse<User>> {
        const res = await RESTApi.get('/api/v1/users/me');
        return {
            data: {
                id: String(res.data.id),
                username: String(res.data.login),
                email: String(res.data.email),
            },
            status: res.status,
            ok: res.ok,
        };
    },

    /**
     * Асинхронная функция для авторизации пользователя (входа в систему).
     *
     * @param {string} username - Имя пользователя для авторизации.
     * @param {string} email - Email пользователя.
     * @param {string} password - Пароль пользователя.
     * @returns {Promise<{data: Object, status: number, ok: boolean}>} Ответ сервера с результатом авторизации, статусом и флагом успеха.
     */
    async postSignin(username: string, email: string, password: string): Promise<JsonResponse<Login>> {
        const res = await RESTApi.post('/api/v1/auth/login', {login: username, email, password});
        return {
            data: {
                //что-то возвращают
            },
            status: res.status,
            ok: res.ok,
        };
    },

    /**
     * Асинхронная функция для регистрации нового пользователя.
     *
     * @param {string} username - Имя пользователя при регистрации.
     * @param {string} email - Email пользователя.
     * @param {string} password - Пароль пользователя.
     * @returns {Promise<{data: Object, status: number, ok: boolean}>} Ответ сервера с результатом регистрации, статусом и флагом успеха.
     */
    async postSignup(username: string, email: string, password: string): Promise<JsonResponse<Logout>> {
        const res = await RESTApi.post('/api/v1/auth/signup', {login: username, email, password});
        return {
            data: {
                //что-то возвращает
            },
            status: res.status,
            ok: res.ok,
        };
    }

};
