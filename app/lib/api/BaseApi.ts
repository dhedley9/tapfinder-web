import { ApiError, HttpError, NetworkError, APIErrorMessage } from "./errors";

type Headers = {
    'Content-Type': string,
    'Authorization'?: string
}

export abstract class TapFinderAPI{

    protected baseURL : string | undefined;

    protected constructor() {

        this.baseURL = process.env.API_URL;
    }

    protected async get( route: string, token: null | string = null ) {

        const args = {
            method: 'GET',
            headers: this.getRequestHeaders( token ),
        }

        return this.request( route, args );
    }

    protected async post( route: string, body = {}, token: null | string = null ) {

        const args = {
            method: 'POST',
            headers: this.getRequestHeaders( token ),
            body: JSON.stringify( body )
        };

        return this.request( route, args );
    }

    protected async request( route: string, args: object ) {

        const url = this.baseURL + route;

        let response: Response;
        let response_body;

        try {
            response = await fetch( url, args );
            response_body = await response.json();
        }
        catch( error ) {
            throw new NetworkError( error );
        }

        if( response.status < 200 || response.status >= 300 ) {

            if( response_body ) {

                if( 'errors' in response_body ) {

                    const errors: APIErrorMessage[] = response_body.errors;
                    const messages: string[] = errors.map( error => error.msg );

                    throw new ApiError( response.status, response.statusText, messages );
                }
                
                throw new ApiError( response.status, response.statusText, response_body.message );
            }
            else{
                throw new HttpError( response.status, response.statusText );
            }
        }

        return response_body;
    }

    protected getRequestHeaders( token: null | string = null  ) {

        const headers: Headers = { 
            'Content-Type': 'application/json'
        };

        if( typeof token === 'string' ) {
            headers['Authorization'] = 'Bearer ' + token;
        }

        return headers;
    }
}