import ApiError from '../error/api-error.mjs'
import mmm from 'mmmagic'
import path from 'path'
import  { readFile } from 'fs/promises'

const magic = new mmm.Magic(mmm.MAGIC_MIME_TYPE);

function typeCheck(acceptedTypes, type, subtype) {
    if(Object.keys(acceptedTypes).includes(type)){
        if (acceptedTypes[type] === "*") return true;
        if (acceptedTypes[type].includes(subtype)) return true;
        return false
    }
}

function fileTypeCheck() {
    return async (req, res, next) => {
        const conf = JSON.parse(await readFile(new URL('../api.config.json', import.meta.url))).typeCheck;
        magic.detectFile(req.body.file.path, (err, mime) => {
            if (err) next(ApiError.badRequest(err.message));
            else {
                let m = mime.split('/');
                if(typeCheck(conf.acceptedTypes, m[0], m[1]) && 
                    !conf.rejectedExt.includes(path.extname(req.body.file.path).replace(".",""))
                ) next();
                else next(ApiError.badRequest(`This type of file is not accepted.`));
            }
        });
    }
}

// function fileTypeCheck() {
//     return async (req, res, next) => {

//         magic.detectFile(req.body.file.path, (err, mime) => {
//             if (err) next(ApiError.badRequest(err.message));
//             else {
//                 let type = mime.split('/')[0];
//                 console.log(type);
//                 if(types.includes(type)){
//                     next()
//                 }else next(ApiError.badRequest(`The file is not an image, is ${type}`));
//             }
//         });
//     }
// }
export default fileTypeCheck

