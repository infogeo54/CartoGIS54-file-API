import path from "path"
import { baseRoute } from '../utils.mjs';


class ImagePathUtils {

    constructor(req){
        this.req = req;
    }

    get dir(){
        return path.join(this.req.params.layer, 'images');
    }

    get pathToDir(){
        return path.join(baseRoute, this.dir);
    }
    
    get completePath(){
        return path.join( baseRoute, this.dir, this.req.params.name)
        
    }
    
}

export default ImagePathUtils