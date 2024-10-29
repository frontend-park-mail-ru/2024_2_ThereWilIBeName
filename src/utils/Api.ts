import RESTApi from './RESTApi';

type JsonResponse<T> = {
    data: T,
    status: number,
    ok: boolean,
}

type Attraction = {
    id: string,
    name: string,
    imagePath: string,
    description: string,
    rating: number,
    numberOfReviews: number,
    address: string,
    cityID: number,
    phoneNumber: string,
    categoriesId: number[],
}

type User = {
    id: string,
    username: string,
    email: string,
}

type Login = {
    id: string,
    login: string,
    email: string,
    created_at: string,
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
        const getAttractionsUrl = '/api/v1/places?limit=20&offset=0';
        const res = await RESTApi.get(getAttractionsUrl);
        return {
            data: res.data.map( (attraction: any) =>
                ({
                    id: String(attraction.id),
                    name: String(attraction.name),
                    imagePath: String(attraction.imagePath),
                    description: String(attraction.description),
                    rating: Number(attraction.rating),
                    numberOfReviews: Number(attraction.numberOfReviews),
                    address: String(attraction.address),
                    cityID: Number(attraction.cityID),
                    phoneNumber: String(attraction.phoneNumber),
                    categoriesId: attraction.categoriesId as number[],
                })
            ),
            status: res.status,
            ok: res.ok,
        };
    },

    async getAttraction(id: number): Promise<JsonResponse<Attraction>> {
        const res = await RESTApi.get(`/api/v1/places/${id}`);
        return {
            data: {
                id: String(res.data.id),
                name: String(res.data.name),
                imagePath: String(res.data.imagePath),
                description: String(res.data.description),
                rating: Number(res.data.rating),
                numberOfReviews: Number(res.data.numberOfReviews),
                address: String(res.data.address),
                cityID: Number(res.data.cityID),
                phoneNumber: String(res.data.phoneNumber),
                categoriesId: res.data.categoriesId as number[],
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

    async postLogout(username: string, id: string): Promise<JsonResponse<Logout>> {
        const res = await RESTApi.post('/api/v1/auth/logout', {username, id});
        return {
            data: {},
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
                id: String(res.data.id),
                login: String(res.data.login),
                email: String(res.data.email),
                created_at: String(res.data.created_at),
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
    async postSignup(username: string, email: string, password: string): Promise<JsonResponse<Login>> {
        const res = await RESTApi.post('/api/v1/auth/signup', {login: username, email, password});
        return {
            data: {
                id: String(res.data.id),
                login: String(res.data.login),
                email: String(res.data.email),
                created_at: String(res.data.created_at),
            },
            status: res.status,
            ok: res.ok,
        };
    }

};
