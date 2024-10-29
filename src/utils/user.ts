/**
 * Класс `User` представляет singleton-пользователя в приложении.
 * Содержит информацию о пользователе, такую как имя, email и id.
 */
class User {
    /**
     * Единственный экземпляр класса `User`.
     * @type {User | null}
     * @private
     */
    private static instance: User | null = null;

    /**
     * Имя пользователя.
     * @type {string}
     * @private
     */
    private _username: string;

    /**
     * Электронная почта пользователя.
     * @type {string}
     * @private
     */
    private _email: string;

    /**
     * ID пользователя.
     * @type {string}
     * @private
     */
    private _id: string;

    /**
     * Приватный конструктор для предотвращения создания экземпляра извне.
     * @private
     */
    private constructor() {
        this._username = '';
        this._email = '';
        this._id = '';
    }

    /**
     * Возвращает единственный экземпляр класса `User`.
     * Если экземпляр не существует, создает его.
     * @returns {User} Экземпляр `User`.
     */
    public static getInstance(): User {
        if (this.instance === null) {
            this.instance = new User();
        }
        return this.instance;
    }

    /**
     * Возвращает имя пользователя.
     * @returns {string} Имя пользователя.
     */
    public get username(): string {
        return this._username;
    }

    /**
     * Устанавливает имя пользователя.
     * @param {string} value Имя пользователя.
     */
    public set username(value: string) {
        this._username = value;
    }

    /**
     * Возвращает email пользователя.
     * @returns {string} Email пользователя.
     */
    public get email(): string {
        return this._email;
    }

    /**
     * Устанавливает email пользователя.
     * @param {string} value Email пользователя.
     */
    public set email(value: string) {
        this._email = value;
    }

    /**
     * Возвращает ID пользователя.
     * @returns {string} ID пользователя.
     */
    public get id(): string {
        return this._id;
    }

    /**
     * Устанавливает ID пользователя.
     * @param {string} value ID пользователя.
     */
    public set id(value: string) {
        this._id = value;
    }
}

export default User.getInstance();
