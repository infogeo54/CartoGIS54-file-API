/** Class to create error for the API */
class ApiError {
    /**
     * Create an instance of an ApiError
     * 
     * @param { number } code - The HTTP status code 
     * @param { string } message - The error message 
     */
    constructor(code, message){
        this.code = code;
        this.message = message;
    }

    /**
     * Create an ApiError for a bad request error (code 400)
     * 
     * @param {string } msg - The error message 
     * 
     * @returns { ApiError } The ApiError instance
     */
    static badRequest(msg) {
        return new ApiError(400, msg);
    }

    /**
     * Create an ApiError for a not found error (code 404)
     * 
     * @param {string } msg - The error message 
     * 
     * @returns { ApiError } The ApiError instance
     */
    static notFound(msg) {
        return new ApiError(404, msg);
    }
}

export default ApiError