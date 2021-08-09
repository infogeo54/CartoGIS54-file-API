import express from 'express'
import mmm from 'mmmagic'


const magic = new mmm.Magic(mmm.MAGIC_MIME_TYPE);

/** Class to write the response to the client */
class Writer {

    /**
     * Return a message in Json to the client 
     * 
     * @param { express.Response } res - The response object
     * @param { string } msg - The message to send to the Json Format
     * @param { number } [code=200] - The HTTP status code, default 200
     */
    static jsonOutput(res, msg, code=200){
        res.status(code).json(msg)
    }

    /**
     * Return a file to the client
     * 
     * @param { express.Response } res - The response object
     * @param { string } path - The path to the file
     * @param { number } [code=200] - The HTTP status code, default 200
     */
    static sendFile(res, path, code=200){
        magic.detectFile(path, (err, mime) => {
            if (err) this.jsonOutput(res, 'File not found', 404);
            else res.status(code).type(mime).sendFile(path);
        });
    }
}

export default Writer