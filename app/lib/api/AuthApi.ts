import { TapFinderAPI } from "./BaseApi";

type LoginResponse = {
    token: string;
    message: string;
};

export class AuthApi extends TapFinderAPI{

    constructor() {

        super();

        this.baseURL = this.baseURL + '/auth';
    }

    async login( email: string, password: string ) {

        const args = { email, password };
        
        const response: LoginResponse = await this.request( '/login', 'POST', args );

        return response;
    }
}