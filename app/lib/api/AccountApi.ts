import { TapFinderAPI } from "./BaseApi";

type UserData = {
    id: number,
    email: string,
    firstName: string,
    lastName: string,
    passwordHash: string,
    salt: string,
    lastLogin: string | null,
    emailValidated: boolean,
    twoFactorEnabled: boolean,
    createdAt: string,
    updatedAt: string
};

export class AccountApi extends TapFinderAPI{

    constructor() {

        super();

        this.baseURL = this.baseURL + '/account';
    }

    async getAccount( token: string ) {
        
        const response:UserData = await this.get( '/', token );

        return response;
    }
}