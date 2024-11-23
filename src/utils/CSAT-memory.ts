class CSATMemory {

    private static instance: CSATMemory | null = null;

    searchQ: boolean = false;
    searchActiveQ: boolean = false;
    profileQ: boolean = false;
    profileActiveQ: boolean = false;
    homeQ: boolean = false;
    homeActiveQ: boolean = false;
    tripsQ: boolean = false;
    tripsActiveQ: boolean = false;


    private constructor() {
        this.searchQ = false;
        this.searchActiveQ = false;
        this.profileQ = false;
        this.profileActiveQ = false;
        this.homeQ = false;
        this.homeActiveQ = false;
        this.tripsQ = false;
        this.tripsActiveQ = false;
    }

    public static getInstance(): CSATMemory {
        if (this.instance === null) {
            this.instance = new CSATMemory();
        }
        return this.instance;
    }
}

export default CSATMemory.getInstance();
