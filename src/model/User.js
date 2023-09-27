class UserBase {
    constructor(role) {
        if (new.target === UserBase) {
            throw new Error('Cannot be instantiated');
        }
        this.role = role;
    }

    static set ATHLETE(e){}

    static get ATHLETE(){return true;}

    static set ADO(e){}

    static get ADO(){return false;}
}

export default class User extends UserBase {
    constructor(deliver) {
        super(deliver);
    }

    static create(deliver) {
        switch (deliver.role) {
            case User.ATHLETE:
                let userAth = new User(User.ATHLETE);
                userAth.id = deliver.id || null;
                userAth.email = deliver.email || null;
                userAth.location = deliver.location || null;
                userAth.name = deliver.name || null;
                userAth.token = deliver.token || null;
                return userAth;
                break;
            case false:
                let userAdo = new User(User.ADO);
                userAdo.id = deliver.id || null;
                userAdo.email = deliver.email || null;
                userAdo.location = deliver.location || null;
                userAdo.name = deliver.name || null;
                userAdo.token = deliver.token || null;
                return userAdo;
                break;
            default:
                throw new Error('Only Athlete or Ado!');
        }
    }

    show() {
        const str = `I'm ${this.role}, ID: ${this.id}`;
        console.log(str)
    }
}