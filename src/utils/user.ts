class User {
    private static instance: User | null = null;

    private _username: string;
    private _email: string;
    private _id: string;

    private constructor() {
        this._username = '';
        this._email = '';
        this._id = '';
    }

    public static getInstance(): User {
        if (this.instance === null) {
            this.instance = new User();
        }
        return this.instance;
    }

    public get username(): string {
        return this._username;
    }

    public get email(): string {
        return this._email;
    }

    public get id(): string {
        return this._id;
    }

    public set username(value: string) {
        this._username = value;
    }

    public set email(value: string) {
        this._email = value;
    }

    public set id(value: string) {
        this._id = value;
    }
}

export default User.getInstance();
