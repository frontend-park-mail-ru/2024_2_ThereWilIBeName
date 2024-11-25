/**
 * Класс `User` представляет singleton-пользователя в приложении.
 * Содержит информацию о пользователе, такую как имя, email и id.
 */
class Trip {
    /**
     * Единственный экземпляр класса `User`.
     * @type {User | null}
     * @private
     */
    private static instance: Trip | null = null;

    id: string;

    private constructor() {

        this.id = '';
    }

    public static getInstance(): Trip {
        if (this.instance === null) {
            this.instance = new Trip();
        }
        return this.instance;
    }
}

export default Trip.getInstance();
