import ApiError from "../error/api-error.mjs";

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

export default validateDto;