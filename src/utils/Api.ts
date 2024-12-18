import RESTApi from './RESTApi';
import formatDate from '../components/formateDate';

type JsonResponse<T> = {
    data: T,
    status: number,
    ok: boolean,
}

type Trips = {
    id: string,
    userId: number,
    name: string,
    cityId: number,
    description: string,
    startDate: string,
    endDate: string,
    private: boolean,
    photos: {
        photoPath: string
    }[],
}

type Trip = {
    trip: {
        id: string,
        userId: number,
        name: string,
        cityId: number,
        description: string,
        startDate: string,
        endDate: string,
        private: boolean,
        photos: {
            photoPath: string
        }[],
    },
    users: {
        username: string,
        avatarPath: string,
        email: string,
    }[],
    userAdded: boolean,
}

type TripPhoto = {
    photoPath: string
};

type Attraction = {
    id: string,
    name: string,
    imagePath: string,
    description: string,
    rating: number,
    address: string,
    city: string,
    phoneNumber: string,
    categories: {
        categoryName: string,
    }[],
    latitude: number,
    longitude: number,
}

type Attractions = {
    id: string,
    name: string,
    imagePath: string,
    description: string,
    rating: number,
    address: string,
    city: string,
    phoneNumber: string,
    categories: string[],
    latitude: number,
    longitude: number,
}

type User = {
    id: string,
    profile: {
        username: string,
        email: string,
        avatarPath: string,
    }
}

type Login = {
    user: {id: string,
        login: string,
        email: string,
        createdAt: string,
    },
    token: string,
}

type Logout = {
    // что-то начнут возвращать
}

type changePassword = {
    id: number,
    newPassword: string,
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
    userLogin: string,
    avatarPath: string,
    rating: number,
    reviewText: string,
}

type UserReview = {
    id: number,
    placeName: string,
    rating: number,
    reviewText: string,
}

type Avatar = {
    message: string,
    avatarPath: string,
}

type Author = {
    login: string,
    avatar_path: string | null,
    email: string,
}

type Profile = {
    username: string,
    avatarPath: string | null,
    email: string,
}

type Response = {
    message: string,
}

type SearchItem = {
    name: string,
    id: number,
    type: string,
}

type Survey = {
    // ничего не возвращают
}

type Link = {
    link: string,
}

type Achievements = {
        id: number,
        name: string,
        iconPath: string,
}

export default {
    async getAchievements(userId: string): Promise<JsonResponse<Achievements[]>> {
        const res = await RESTApi.get(`api/v1/users/${userId}/achievements`);
        return {
            data: Array.isArray(res.data) ? res.data.map( (achievement: any) =>
                ({
                    id: Number(achievement.id),
                    name: String(achievement.name),
                    iconPath: String(achievement.icon_path),
                })) : [],
            status: res.status,
            ok: res.ok,
        };
    },
    
    async getStat(surveyId: string) {
        const res = await RESTApi.get(`/api/v1/survey/stats/${surveyId}`);
        return {
            data: {
                surveyId: Number(res.data.survey_id),
                surveyText: String(res.data.survey_text),
                avgRating: Number(res.data.avg_rating),
                ratingsCount: res.data.ratings_count as number[],
            },
            status: res.status,
            ok: res.ok,
        };
    },

    async getSearch(query: string): Promise<JsonResponse<SearchItem[]>> {
        const res = await RESTApi.get(`/api/v1/search?query=${encodeURIComponent(query)}`);
        return {
            data: Array.isArray(res.data) ? res.data.map( (searchItem: any) =>
                ({
                    name: String(searchItem.name),
                    id: Number(searchItem.id),
                    type: String(searchItem.type),
                })) : [],
            status: res.status,
            ok: res.ok,
        };
    },

    /**
     * Асинхронная функция для получения списка достопримечательностей с сервера.
     *
     * @returns {Promise<{data: Object[], status: number, ok: boolean}>} Ответ сервера с данными достопримечательностей, статусом и флагом успеха.
     */
    async getAttractions(limit: number, offset:number, cityId: number, categoryId: number, filterId: number): Promise<JsonResponse<Attractions[]>> {
        let getAttracionsURL = `/api/v1/places/search?limit=${limit}&offset=${offset}`;
        if (cityId !== -1) {
            getAttracionsURL = getAttracionsURL + `&city=${cityId}`;
        }
        if (categoryId !== -1) {
            getAttracionsURL = getAttracionsURL + `&category=${categoryId}`;
        }
        if (filterId !== -1) {
            getAttracionsURL = getAttracionsURL + `&filter=${filterId}`;
        }
        const res = await RESTApi.get(getAttracionsURL);
        return {
            data: Array.isArray(res.data) ? res.data.map( (attraction: any) =>
                ({
                    id: String(attraction.id),
                    name: String(attraction.name),
                    imagePath: String(attraction.imagePath),
                    description: String(attraction.description),
                    rating: Number(attraction.rating),
                    numberOfReviews: Number(attraction.numberOfReviews),
                    address: String(attraction.address),
                    city: String(attraction.city),
                    phoneNumber: String(attraction.phoneNumber),
                    categories: attraction.categoriesId as string[],
                    latitude: Number(res.data.latitude),
                    longitude: Number(res.data.longitude),
                })) : [],
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
                address: String(res.data.address),
                city: String(res.data.city),
                phoneNumber: String(res.data.phoneNumber),
                categories: Array.isArray(res.data.categories)
                    ? res.data.categories.map((category: any) => ({ categoryName: String(category) }))
                    : [],
                latitude: Number(res.data.latitude),
                longitude: Number(res.data.longitude),
            },
            status: res.status,
            ok: res.ok,
        };
    },

    async getProfile(id: string): Promise<JsonResponse<Profile>> {
        const res = await RESTApi.get(`/api/v1/users/${id}/profile`);
        return {
            data: {
                username: String(res.data.login),
                avatarPath: res.data.avatar_path = res.data.avatar_path ?
                    String(res.data.avatar_path) : null,
                email: String(res.data.email),
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
                profile: {
                    username: String(res.data.profile.login),
                    email: String(res.data.profile.email),
                    avatarPath: String(res.data.profile.avatar_path),
                }
            },
            status: res.status,
            ok: res.ok,
        };
    },

    async getReviews(id: number): Promise<JsonResponse<GetReview[]>> {
        const res = await RESTApi.get(`/api/v1/places/${id}/reviews`);
        return {
            data: Array.isArray(res.data) ? res.data.map( (review: any) =>
                ({
                    id: Number(review.id),
                    userLogin: String(review.user_login),
                    avatarPath: String(review.avatar_path),
                    rating: Number(review.rating),
                    reviewText: String(review.review_text),
                })) : [],
            status: res.status,
            ok: res.ok,
        };
    },

    async getUserTrips(id: string): Promise<JsonResponse<Trips[]>> {
        const res = await RESTApi.get(`/api/v1/users/${id}/trips`);
        return {
            data: Array.isArray(res.data) ? res.data.map( (trip) => ({
                userId: Number(trip.user_id),
                id: String(trip.id),
                name: String(trip.name),
                cityId: Number(trip.city_id),
                description: String(trip.description),
                startDate: formatDate(trip.start_date),
                endDate: formatDate(trip.end_date),
                private: Boolean(trip.private),
                photos: Array.isArray(trip.photos)
                    ? trip.photos.map((photo: any) => ({ photoPath: String(photo) }))
                    : [],
            })) : [],
            status: res.status,
            ok: res.ok,
        };
    },

    async getTrip(tripId: number, userId: string | undefined = undefined): Promise<JsonResponse<Trip>> {
        let reqUrl = `/api/v1/trips/${tripId}`;
        if (userId) {
            reqUrl = reqUrl + `?user_id=${userId}`;
        }
        const res = await RESTApi.get(reqUrl);
        return {
            data: {
                trip: {
                    userId: Number(res.data.trip.user_id),
                    id: String(res.data.trip.id),
                    name: String(res.data.trip.name),
                    cityId: Number(res.data.trip.city_id),
                    description: String(res.data.trip.description),
                    startDate: formatDate(res.data.trip.start_date),
                    endDate: formatDate(res.data.trip.end_date),
                    private: Boolean(res.data.trip.private),
                    photos: Array.isArray(res.data.trip.photos)
                        ? res.data.photos.map((photo: any) => ({ photoPath: String(photo) }))
                        : [],
                },
                users: Array.isArray(res.data.users) ? res.data.users.map( (user: Author) => ({
                    username: String(user.login),
                    avatarPath: String(user.avatar_path),
                    email: String(user.email),
                })) : [],
                userAdded: Boolean(res.data.user_added),
            },
            status: res.status,
            ok: res.ok,
        };
    },

    async postTripLink(tripId: number, option: string): Promise<JsonResponse<Link>> {
        const res = await RESTApi.post(`/api/v1/trips/${tripId}/share?sharing_option=${option}`, {});
        return {
            data: {
                link: String(res.data.url),
            },
            status: res.status,
            ok: res.ok,
        };
    },

    async getUserReviews(id: string): Promise<JsonResponse<UserReview[]>> {
        const res = await RESTApi.get(`/api/v1/users/${id}/reviews`);
        return {
            data: Array.isArray(res.data) ? res.data.map( (review) => ({
                id: Number(review.id),
                placeName: String(review.place_name),
                rating: Number(review.rating),
                reviewText: String(review.review_text),
            })) : [],
            status: res.status,
            ok: res.ok,
        };
    },

    async postHomeCSAT(userId: string, rating: number): Promise<JsonResponse<Survey>> {
        const res = await RESTApi.post('/api/v1/survey/1', {survey_id: 1, user_id: userId, rating});
        return {
            data: {},
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
                user: {
                    id: String(res.data.user.id),
                    login: String(res.data.user.login),
                    email: String(res.data.user.email),
                    createdAt: String(res.data.user.created_at),
                },
                token: res.data.token,
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
                user: {
                    id: String(res.data.user.id),
                    login: String(res.data.user.login),
                    email: String(res.data.user.email),
                    createdAt: String(res.data.user.created_at),
                },
                token: res.data.token,
            },
            status: res.status,
            ok: res.ok,
        };
    },

    async postReview(user_id: number, place_id: number, review_text: string, rating: number): Promise<JsonResponse<PostReview>> {
        const res = await RESTApi.post(`/api/v1/places/${place_id}/reviews`, {user_id, place_id, rating, review_text});
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

    async postCreateTrip(userId:number, name: string, cityId: number, description: string, startDate: string, endDate: string, privateTrip: boolean): Promise<JsonResponse<Trip>> {
        const res = await RESTApi.post('/api/v1/trips', {user_id: userId, name, city_id: cityId, description: description, start_date: startDate, end_date: endDate, private_trip: privateTrip });
        return {
            data: res.data,
            status: res.status,
            ok: res.ok,
        };
    },

    async putTrip(tripId: number, userId:number, name: string, cityId: number, description: string, startDate: string, endDate: string, privateTrip: boolean): Promise<JsonResponse<Trip>> {
        const res = await RESTApi.put(`/api/v1/trips/${tripId}`, {user_id: userId, name, city_id: cityId, description: description, start_date: startDate, end_date: endDate, private_trip: privateTrip });
        return {
            data: res.data,
            status: res.status,
            ok: res.ok,
        };
    },

    async putChangePassword(id: string,oldPassword: string, newPassword: string): Promise<JsonResponse<changePassword>> {
        const res = await RESTApi.put(`/api/v1/users/${id}/update/password`, {old_password: oldPassword, new_password: newPassword});
        return {
            data: {
                id: Number(res.data.id),
                newPassword: String(res.data.password)
            },
            status: res.status,
            ok: res.ok,
        };
    },

    async putUserInformation(id: string, username: string, email: string): Promise<JsonResponse<User>> {
        const res = await RESTApi.put(`/api/v1/users/${id}/profile`, {username, email});
        return {
            data: {
                id: String(res.data.id),
                profile: {
                    username: String(res.data.profile.username),
                    email: String(res.data.profile.email),
                    avatarPath: String(res.data.profile.avatar_path),
                }
            },
            status: res.status,
            ok: res.ok,
        };
    },

    async putAvatar(id: string, avatar: string): Promise<JsonResponse<Avatar>> {
        const res = await RESTApi.put(`/api/v1/users/${id}/avatars`, {avatar});
        return {
            data: {
                message: String(res.data.message),
                avatarPath: String(res.data.avatarPath)
            },
            status: res.status,
            ok: res.ok,
        };
    },

    async putPhotos(tripId: string, newPhotos: string[]): Promise<JsonResponse<TripPhoto[]>> {
        const res = await RESTApi.put(`/api/v1/trips/${tripId}/photos`, {photos: newPhotos});
        return {
            data: Array.isArray(res.data) ? res.data.map( (photo) => ({
                photoPath: String(photo.photoPath),
            })) : [],
            status: res.status,
            ok: res.ok,
        };
    },

    async deleteTrip(id: string): Promise<JsonResponse<Response>> {
        const res = await RESTApi.delete(`/api/v1/trips/${id}`, {id: id});
        return {
            data: res.data,
            status: res.status,
            ok: res.ok,
        };
    },

    async deleteReview(reviewId: string, placeId: number): Promise<JsonResponse<Response>> {
        const res = await RESTApi.delete(`/api/v1/places/${placeId}/reviews/${reviewId}`);
        return {
            data: {
                message: String(res.data.message),
            },
            status: res.status,
            ok: res.ok,
        };
    },

    async deletePhoto(tripId: string, photoPath: string): Promise<JsonResponse<Response>> {
        const res = await RESTApi.delete(`/api/v1/trips/${tripId}/photos`, {photo_path: photoPath});
        return {
            data: {
                message: String(res.data.message),
            },
            status: res.status,
            ok: res.ok,
        };
    }
};
