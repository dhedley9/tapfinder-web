import { ApiError, HttpError, NetworkError } from "./errors";

export abstract class TapFinderAPI{

    protected baseURL : string | undefined;

    protected constructor() {

        this.baseURL = process.env.API_URL;
    }

    protected async request( route : string, method = 'POST', body = {} ) {

        const url = this.baseURL + route;

        const args = {
            method: method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify( body )
        };

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
                throw new ApiError( response.status, response.statusText, response_body.message );
            }
            else{
                throw new HttpError( response.status, response.statusText );
            }
        }

        return response_body;
    }
}