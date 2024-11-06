import RESTApi from './RESTApi';

type JsonResponse<T> = {
    data: T,
    status: number,
    ok: boolean,
}

type Trip = {
    cityId: number,
    createdAt: string,
    description: string,
    endDate: string,
    id: number,
    name: string,
    private: boolean,
    startDate: string,
    userId: number,
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
    createdAt: string,
}

type Logout = {
    // что-то начнут возвращать
}

type PostReview = {
    id: number,
    user_id: number,
    place_id: number,
    rating: number,
    review_text: string,
    created_at: string,
}

type GetReview = {
    id: number,
    username: string,
    avatar_path: string,
    rating: number,
    review_text: string,
}

type Response = {
    message: string,
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
        };
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
                createdAt: String(res.data.created_at),
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
                createdAt: String(res.data.created_at),
            },
            status: res.status,
            ok: res.ok,
        };
    },

    async getReviews(id: number): Promise<JsonResponse<GetReview[]>> {
        const res = await RESTApi.get(`/api/v1/reviews/${id}`);
        return {
            data: res.data.map( (review: any) =>
                ({
                    id: Number(review.data.id),
                    username: String(review.data.username),
                    avatar_path: String(review.data.avatar_path),
                    rating: Number(review.data.rating),
                    review_text: String(review.data.review_text),
                })
            ),
            status: res.status,
            ok: res.ok,
        };
    },

    async postReview(user_id: number, place_id: number, review_text: string, rating: number): Promise<JsonResponse<PostReview>> {
        const res = await RESTApi.post('/api/v1/reviews', {user_id, place_id, rating, review_text});
        return {
            data: {
                id: Number(res.data.id),
                user_id: Number(res.data.user_id),
                place_id: Number(res.data.place_id),
                rating: Number(res.data.rating),
                review_text: String(res.data.review_text),
                created_at: String(res.data.created_at),
            },
            status: res.status,
            ok: res.ok,
        };
    },

    async deleteReview(id: number): Promise<JsonResponse<Response>> {
        const res = await RESTApi.delete(`/api/v1/reviews/${id}`);
        return {
            data: {
                message: String(res.data.message),
            },
            status: res.status,
            ok: res.ok,
        };
    },

    async getUserTrips(id: string): Promise<JsonResponse<Trip>> {
        const res = await RESTApi.get(`/api/v1/users/${id}/trips`);
        return {
            data: {
                cityId: Number(res.data.city_id),
                createdAt: String(res.data.created_at),
                description: String(res.data.description),
                endDate: String(res.data.end_date),
                id: Number(res.data.id),
                name: String(res.data.name),
                private: Boolean(res.data.private),
                startDate: String(res.data.start_date),
                userId: Number(res.data.user_id),
            },
            status: res.status,
            ok: res.ok,
        };
    },

};
