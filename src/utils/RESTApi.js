
async function request(method, url, body = undefined) {
    const req = await fetch(url, {
        method: method,
        body: body,
        headers: {
            'Content-Type': 'application/json',
        },
    });

    let data;

    try {
        data = await req.json();
    } catch (error) {
        console.error('Ошибка при парсинге JSON:', error);
        data = {};
    }

    return {
        data: data,
        status: req.status,
        ok: req.ok,
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
