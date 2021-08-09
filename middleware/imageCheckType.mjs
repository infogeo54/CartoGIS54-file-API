import ApiError from '../error/api-error.mjs'
import mmm from 'mmmagic'

const magic = new mmm.Magic(mmm.MAGIC_MIME_TYPE);

/**
 * Test if the file in the body is an image
 * 
 * @returns { fileAPIMiddleware } return a middleware function
 */
function imageTypeCheck() {
    return async (req, res, next) => {

        magic.detectFile(req.body.image.path, (err, mime) => {
            if (err) next(ApiError.badRequest(err.message));
            else {
                if (mime.split('/')[0] != 'image') {
                    next(ApiError.badRequest(`The file is not an image`))
                }else next();

            }
        });
    }
}
/**
 * @typedef { Function } fileAPIMiddleware
 * @async
 * @param { express.Request } req - The request object
 * @param { express.Response } res - The response object 
 * @param { express.NextFunction } next - The next middleware function
 */

export default imageTypeCheck