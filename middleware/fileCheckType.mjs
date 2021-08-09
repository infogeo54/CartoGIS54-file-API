import express from 'express'
import ApiError from '../error/api-error.mjs'
import mmm from 'mmmagic'
import path from 'path'
import  { readFile } from 'fs/promises'

const magic = new mmm.Magic(mmm.MAGIC_MIME_TYPE);

/**
 * Test if the MIME type of the file is accepted or not
 * 
 * @param { Array } acceptedTypes - The list of the accepted types
 * @param { string } type - The MIME type of the file 
 * @param { string } subtype - The MIME subtype of the file 
 * @returns { boolean } - if types is accepted or not
 */
function typeCheck(acceptedTypes, type, subtype) {
    if(Object.keys(acceptedTypes).includes(type)){
        if (acceptedTypes[type] === "*") return true;
        if (acceptedTypes[type].includes(subtype)) return true;
        return false
    }
}

/**
 * Test if the file type is accepted or rejected
 * 
 * @returns { fileAPIMiddleware } return a middleware function
 */
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

/**
 * @typedef { Function } fileAPIMiddleware
 * @async
 * @param { express.Request } req - The request object
 * @param { express.Response } res - The response object 
 * @param { express.NextFunction } next - The next middleware function
 */

export default fileTypeCheck

