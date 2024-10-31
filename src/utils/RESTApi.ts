/**
 * Асинхронная функция для выполнения HTTP-запросов с использованием fetch.
 * Обрабатывает ошибки запроса и парсинга JSON.
 *
 * @param {string} method - HTTP-метод (GET, POST, PUT, DELETE и т.д.).
 * @param {string} url - URL, по которому нужно отправить запрос.
 * @param {Record<string, any>} [body] - Тело запроса, преобразуемое в JSON (для методов POST, PUT, DELETE).
 * @returns {Promise<{data: any, status: number, ok: boolean}>} Объект с данными ответа, статусом и флагом успеха.
 */
async function request(
    method: string,
    url: string,
    body: Record<string, any> | undefined = undefined
): Promise<{ data: any; status: number; ok: boolean }> {
    let res: Response;
    try {
        res = await fetch(url, {
            method: method,
            body: body ? JSON.stringify(body) : undefined,
            headers: {
                'Content-Type': 'application/json',
            },
            mode: 'cors',
            credentials: 'include',
        });
    } catch (error) {
        console.error('Ошибка fetch:', error);
        return {
            data: {},
            status: -1,
            ok: false,
        };
    }

    let data: any;
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
const http = {

    /**
     * Выполняет GET-запрос.
     *
     * @param {string} url - URL, по которому нужно выполнить GET-запрос.
     * @returns {Promise<{data: any, status: number, ok: boolean}>} Ответ от сервера.
     */
    get(url: string): Promise<{ data: any; status: number; ok: boolean }> {
        return request('GET', url);
    },

    /**
     * Выполняет POST-запрос.
     *
     * @param {string} url - URL, по которому нужно выполнить POST-запрос.
     * @param {Record<string, any>} body - Данные для отправки в теле запроса.
     * @returns {Promise<{data: any, status: number, ok: boolean}>} Ответ от сервера.
     */
    post(url: string, body: Record<string, any>): Promise<{ data: any; status: number; ok: boolean }> {
        return request('POST', url, body);
    },

    /**
     * Выполняет PUT-запрос.
     *
     * @param {string} url - URL, по которому нужно выполнить PUT-запрос.
     * @param {Record<string, any>} body - Данные для отправки в теле запроса.
     * @returns {Promise<{data: any, status: number, ok: boolean}>} Ответ от сервера.
     */
    put(url: string, body: Record<string, any>): Promise<{ data: any; status: number; ok: boolean }> {
        return request('PUT', url, body);
    },

    /**
     * Выполняет DELETE-запрос.
     *
     * @param {string} url - URL, по которому нужно выполнить DELETE-запрос.
     * @param {Record<string, any>} [body] - Данные для отправки в теле запроса (необязательно).
     * @returns {Promise<{data: any, status: number, ok: boolean}>} Ответ от сервера.
     */
    delete(url: string, body?: Record<string, any>): Promise<{ data: any; status: number; ok: boolean }> {
        return request('DELETE', url, body);
    }
};

export default http;
