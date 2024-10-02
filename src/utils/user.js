class User {
    constructor() {
        if (typeof User.instance === 'object') {
            return User.instance;
        }

        this.username = null;
        this.id = null;

        User.instance = this;
        return this;
    }

    getUsername() {
        return this.username;
    }

    getId() {
        return this.id;
    }

    setUsername(username) {
        this.username = username;
    }

    setId(id) {
        this.password = id;
    }
}

export default new User();
