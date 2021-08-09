import express from 'express'
import Writer from "../writer.mjs";
import ApiError from "./api-error.mjs";

/**
 * The middleware to handle ApiError
 * 
 * @param { (ApiError|object) } err - The possible error
 * @param { express.Request } req - The request body
 * @param { express.Response } res - The response body
 * @param { express.NextFunction } next - The next middleware function
 * @returns the Error to the client
 */
function apiErrorHandler(err, req, res, next) {
    if (err instanceof ApiError) return Writer.jsonOutput(res, err.message, err.code);
    return Writer.jsonOutput(res, err, 500)
}

export default apiErrorHandler;