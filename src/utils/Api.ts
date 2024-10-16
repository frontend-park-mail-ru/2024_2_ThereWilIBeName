import RESTApi from './RESTApi.js';

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
    // что-то начнут возвращать
}

type Logout = {
    // что-то начнут возвращать
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
            data: res.data.map( (attraction: any) =>
                ({
                    id: String(attraction.id),
                    name: String(attraction.name),
                    image: String(attraction.image),
                    description: String(attraction.description),
                    rating: Number(attraction.rating),
                    numberOfReviews: Number(attraction.numberOfReviews),
                    address: String(attraction.address),
                    city: String(attraction.city),
                    phoneNumber: String(attraction.phoneNumber),
                    category: String(attraction.category),
                })
            ),
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

    async deleteUser(username: string, id: string): Promise<JsonResponse<any>> {
        const res = await RESTApi.delete('/api/v1/users/me', {username, id});
        return {
            data: {
                // что-то начнут возвращать
            },
            status: res.status,
            ok: res.ok,
        }
    },

    /**
     * Асинхронная функция для авторизации пользователя (входа в систему).
     *
     * @param {string} email - Email пользователя.
     * @param {string} password - Пароль пользователя.
     * @returns {Promise<{data: Object, status: number, ok: boolean}>} Ответ сервера с результатом авторизации, статусом и флагом успеха.
     */
    async postSignin(email: string, password: string): Promise<JsonResponse<Login>> {
        const res = await RESTApi.post('/api/v1/auth/login', {email, password});
        return {
            data: {
                // что-то начнут возвращать
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
                // что-то начнут возвращать
            },
            status: res.status,
            ok: res.ok,
        };
    }

};
