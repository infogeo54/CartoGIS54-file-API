import Joi from "joi";
import ApiError from "../error/api-error.mjs";

/**
 * Validate the request body with a Joi schema
 * 
 * @param { Joi.ObjectSchema } schema - A Joi schema 
 * 
 * @returns { fileAPIMiddleware } return a middleware function
 */
function validateDto(schema) {
    return async (req, res, next) => {
        try {
            await schema.validateAsync(req.body, { abortEarly: false, allowUnknown : true });
            next()
        } catch (err) {
            let message=[]
            err.details.map(m => message.push(m.message));
            next(ApiError.badRequest(message))
        }
    }
}

/**
 * @typedef { Function } fileAPIMiddleware
 * @async
 * @param { express.Request } req - The request object
 * @param { express.Response } res - The response object 
 * @param { express.NextFunction } next - The next middleware function
 */

export default validateDto;