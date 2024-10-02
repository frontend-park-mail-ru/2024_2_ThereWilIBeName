class User {
    constructor() {
        if (typeof User.instance === 'object') {
            return User.instance;
        }

        this._username = '';
        this._id = '';

        User.instance = this;
        return this;
    }

    get username() {
        return this._username;
    }

    get id() {
        return this._id;
    }

    set username(value) {
        this._username = value;
    }

    set id(value) {
        this._id = value;
    }
}

export default new User();
