function request(method, url, body = undefined) {
    return fetch(url, {
        method: method,
        body: body,
        headers: {
            'Content-Type': 'application/json',
        },
    });
}



export default {

    get(url) {
        return request('GET', url);
    },

    post(url, body) {
        return request('POST', url, body);
    },

    put(url) {
        return request('PUT', url);
    },

    delete(url) {
        return request('DELETE', url);
    }
}