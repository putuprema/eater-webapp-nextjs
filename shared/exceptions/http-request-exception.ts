export default class HttpRequestException extends Error {
    message: string
    status: number
    originalError: Error

    constructor(message: string, status: number, originalError: Error) {
        super(originalError.message);
        this.message = message;
        this.status = status;
        this.originalError = originalError;
    }

    get isUnauthorized() {
        return this.status === 401;
    }

    get isForbidden() {
        return this.status === 403;
    }

    get isBadRequest() {
        return this.status === 400;
    }

    get isNotFound() {
        return this.status === 404;
    }

    get isInternalServerError() {
        return this.status === 500;
    }
}