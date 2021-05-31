import ApiError from '../error/api-error.mjs'
import mmm from 'mmmagic'
import Writer from '../writer.mjs';

const magic = new mmm.Magic(mmm.MAGIC_MIME_TYPE);

const types = [
    "image",
    "text",
    "video"
]

function fileTypeCheck() {
    return async (req, res, next) => {

        magic.detectFile(req.body.file.path, (err, mime) => {
            if (err) next(ApiError.badRequest(err.message));
            else {
                let type = mime.split('/')[0]; 
                if(types.includes(type)){
                    next()
                }else next(ApiError.badRequest(`The file is not an image, is ${type}`));
            }
        });
    }
}

export default fileTypeCheck

