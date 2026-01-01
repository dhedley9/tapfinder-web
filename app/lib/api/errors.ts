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
    
    constructor( status: number, statusText: string,  message: string ) {

        super( status, statusText );

        this.name = "ApiError";
        this.message = message;
    }
}