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

export default {

    get(url) {
        return request('GET', url);
    },

    post(url, body) {
        return request('POST', url, body);
    },

    put(url, body) {
        return request('PUT', url, body);
    },

    delete(url, body) {
        return request('DELETE', url, body);
    }
};
