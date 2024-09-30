/**
 * Асинхронная функция для выполнения HTTP-запросов с использованием fetch.
 * Обрабатывает ошибки запроса и парсинга JSON.
 *
 * @param {string} method - HTTP-метод (GET, POST, PUT, DELETE и т.д.).
 * @param {string} url - URL, по которому нужно отправить запрос.
 * @param {Object} [body] - Тело запроса, которое будет преобразовано в JSON (для методов POST, PUT, DELETE).
 * @returns {Promise<{data: Object, status: number, ok: boolean}>} Объект с данными ответа, статусом и флагом успеха.
 */
async function request(method, url, body = undefined) {
    let res;
    try {
        res = await fetch(url, {
            method: method,
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } catch (error) {
        console.error('Ошибка fetch:', error);
        return {
            data: {},
            status: -1,
            ok: false,
        };
    }


    let data;

    try {
        data = await res.json();
    } catch (error) {
        console.error('Ошибка при парсинге JSON:', error);
        data = {};
    }

    return {
        data: data,
        status: res.status,
        ok: res.ok,
    };
}

/**
 * Объект с методами для выполнения HTTP-запросов: GET, POST, PUT, DELETE.
 */
export default {

    /**
     * Выполняет GET-запрос
     *
     * @param {string} url - URL, по которому нужно выполнить GET-запрос.
     * @returns {Promise<{data: Object, status: number, ok: boolean}>} Ответ от сервера.
     */
    get(url) {
        return request('GET', url);
    },

    /**
     * Выполняет POST-запрос
     *
     * @param {string} url - URL, по которому нужно выполнить POST-запрос.
     * @param {Object} body - Данные для отправки в теле запроса.
     * @returns {Promise<{data: Object, status: number, ok: boolean}>} Ответ от сервера.
     */
    post(url, body) {
        return request('POST', url, body);
    },

    /**
     * Выполняет PUT-запрос
     *
     * @param {string} url - URL, по которому нужно выполнить PUT-запрос.
     * @param {Object} body - Данные для отправки в теле запроса.
     * @returns {Promise<{data: Object, status: number, ok: boolean}>} Ответ от сервера.
     */
    put(url, body) {
        return request('PUT', url, body);
    },

    /**
     * Выполняет DELETE-запрос
     *
     * @param {string} url - URL, по которому нужно выполнить DELETE-запрос.
     * @param {Object} [body] - Данные для отправки в теле запроса (необязательно).
     * @returns {Promise<{data: Object, status: number, ok: boolean}>} Ответ от сервера.
     */
    delete(url, body) {
        return request('DELETE', url, body);
    }
};
