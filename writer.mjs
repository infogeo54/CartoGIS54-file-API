import mmm from 'mmmagic'

const magic = new mmm.Magic(mmm.MAGIC_MIME_TYPE);
class Writer {

    /**
     * Return a message in Json to the client 
     * 
     * @param res The response object
     * @param msg The message to send to the Json Format
     * @param code The HTTP status code
     */
    static jsonOutput(res, msg, code){
        res.header("Access-Control-Allow-Origin", "*")
        res.header("Acces-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
        res.status(code).json(msg)
    }

    /**
     * Return a file to the client
     * 
     * @param res The response object
     * @param path The path to the file
     * @param code The HTTP status code (defautl 200)
     * // mime = The mime-type of the file (cf. Joi.type() documentation) 
     */
    static sendFile(res, path, code=200){
        magic.detectFile(path, (err, mime) => {
            if (err) this.jsonOutput(res, 'File not found', 404);
            else {
                res.header("Access-Control-Allow-Origin", "*")
                res.header("Acces-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
                res.status(code).type(mime).sendFile(path);
            }
        });

    }

}

export default Writer