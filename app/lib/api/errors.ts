export type APIErrorMessage = {
    type: string;
    value: string;
    msg: string;
    path: string;
    location: string;
};

export class NetworkError extends Error {

    constructor( originalError: unknown ) {

        super( 'Network request failed' );

        this.name  = 'NetworkError';
        this.cause = originalError;
    }
}

export class HttpError extends Error {

    public readonly status: number;
    public readonly statusText: string
    
    constructor( status: number, statusText: string ) {

        super( `HTTP ${status}: ${statusText}` );

        this.name = "HttpError";
        this.status = status;
        this.statusText = statusText;
    }
}

export class ApiError extends HttpError {

    public readonly messages: string[];
    
    constructor( status: number, statusText: string,  message: string|string[] ) {

        super( status, statusText );

        this.name = "ApiError";

        if( typeof message === 'string' ) {
            this.message  = message;
            this.messages = [ message ];
        }
        else{
            this.message  = message[0];
            this.messages = message;
        }
    }
}