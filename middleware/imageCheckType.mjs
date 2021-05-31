import ApiError from '../error/api-error.mjs'
import mmm from 'mmmagic'

const magic = new mmm.Magic(mmm.MAGIC_MIME_TYPE);

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

export default imageTypeCheck