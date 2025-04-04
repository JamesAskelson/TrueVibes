import { User } from "./user";

export class UserParams {
    gender: string;
    orderBy = "lastActive";
    minAge = 18;
    maxAge = 99;
    pageNumber = 1;
    pageSize = 5;

    constructor(user: User | null) {
        this.gender = user?.gender === 'male' ? 'female' : 'male'
    }
}
