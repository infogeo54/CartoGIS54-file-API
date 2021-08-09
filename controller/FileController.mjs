import express from 'express'
import fs, { constants } from 'fs';
import path from "path"
import Writer from '../writer.mjs';
import PathUtils from '../pathUtils/FilePathUtils.mjs';

class FileController {

    /**
     * Send the file of the layer passed in the URI to the client if it exists,
     * else send an error to the client
     * 
     * @param { express.Request } req - The request body
     * @param { express.Response } res - The response body
     */
    getFile(req, res){
        const u = new PathUtils(req)
        fs.access(u.completePath, constants.F_OK ,(err) => {
            if (err) Writer.jsonOutput(res, `File ${req.params.name} not found at ${u.dir}`, 404);
            else {
                Writer.sendFile(res, u.completePath);    
            }
        })
    }

    /**
     * Put the file passed in the request into the layer/files directory (layer passed in the uri).
     * if it succeed return to the client the new name of the file,
     * else send an error to the client.
     * 
     * @param { express.Request } req - The request body
     * @param { express.Response } res - The response body
     */
    postFile(req, res){
        
        const u = new PathUtils(req)
        let fileName = path.parse(req.body.file.path).base;
        
        fs.mkdir(u.pathToDir, {recursive: true}, (err) => {
            if(err) Writer.jsonOutput(res, err, 400);
            else fs.copyFile(req.body.file.path,
                 path.join(u.pathToDir, fileName),
                 (err) => {
                    if(err) Writer.jsonOutput(res, err, 400);
                    else Writer.jsonOutput(res, {
                                                'dir': u.pathToDir,
                                                'name': fileName
                                                }, 201);
                 });
        })
    }

    /**
     * Delete the file of the layer passed in the URI
     * if it succeed return a message to the client
     * else send an error to the client.
     * 
     * @param { express.Request } req - The request body
     * @param { express.Response } res - The response body
     */
    deleteFile(req, res){
        const u = new PathUtils(req)

        fs.rm(u.completePath, (err) => {
            if (err) Writer.jsonOutput(res, `File ${req.params.name} not found at ${u.dir}`, 404);
            else Writer.jsonOutput(res, `${req.params.name} deleted successfully`)
        });

    }


    /**
     * Replaced the file of the layer passed in the URI by the one in the request body
     * if it succeed return to the client the new name of the file,
     * else send an error to the client.
     * 
     * @param { express.Request } req - The request body
     * @param { express.Response } res - The response body
     */
    putFile(req, res){
        const u = new PathUtils(req)
        let fileName = path.parse(req.body.file.path).base;

        fs.access(u.completePath, constants.F_OK ,(err) => {
            if (err) Writer.jsonOutput(res, `File ${req.params.name} not found at ${u.dir}`, 404);
            else fs.copyFile(req.body.file.path,
                    path.join(u.pathToDir, fileName),
                    (err) => {
                       if(err) Writer.jsonOutput(res, err, 400);
                       else fs.rm(u.completePath, (err) => {
                            if(err) Writer.jsonOutput(res, err, 400);
                            else Writer.jsonOutput(res, {
                                        'message' : `${req.params.name} replaced successfully`,
                                        'dir': u.pathToDir,
                                        'name': fileName
                                        }, 201);
                                    });
                    }); 
        })
    }


}

export default new FileController();