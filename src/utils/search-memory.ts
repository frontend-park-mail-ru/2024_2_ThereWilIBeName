class Search {

    private static instance: Search | null = null;

    limit: number;
    offset: number;
    cityId: number;
    categoryId: number;


    private constructor() {

        this.limit = 20;
        this.offset = 0;
        this.cityId = -1;
        this.categoryId = -1;
    }

    public static getInstance(): Search {
        if (this.instance === null) {
            this.instance = new Search();
        }
        return this.instance;
    }
}

export default Search.getInstance();
