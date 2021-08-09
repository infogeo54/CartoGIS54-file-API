import path from "path"
import { baseRoute } from '../utils.mjs';
import express from 'express'

/** Class to create path for the images directories */
class ImagePathUtils {

    /**
     * Create a ImagePathUtils instance
     * 
     * @param { express.Request } req - the Request object
     */
    constructor(req){
        this.req = req;
    }


    /**
     * Return the relative path to the files directories
     *
     * @returns { string } The path 
     */
    get dir(){
        return path.join(this.req.params.layer, 'images');
    }

    /**
     * Return the complete path to the images directories
     *
     * @returns { string } The path 
     */
    get pathToDir(){
        return path.join(baseRoute, this.dir);
    }
    
    /**
     * Return the complete path to the image
     *
     * @returns { string } The path 
     */ 
    get completePath(){
        return path.join( baseRoute, this.dir, this.req.params.name)
        
    }
    
}

export default ImagePathUtils