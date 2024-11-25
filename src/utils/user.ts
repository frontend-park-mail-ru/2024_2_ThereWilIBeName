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

    username: string;
    email: string;
    id: string;
    isSignedIn: boolean;

    /**
     * Приватный конструктор для предотвращения создания экземпляра извне.
     * @private
     */
    private constructor() {
        this.username = '';
        this.email = '';
        this.id = '';
        this.isSignedIn = false;
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
}

export default User.getInstance();
