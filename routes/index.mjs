import express from 'express'; 
import FileController from '../controller/FileController.mjs';
import ImageController from '../controller/ImageController.mjs';
import imageSchema from '../dto/imageSchema.mjs';
import fileSchema from '../dto/fileSchema.mjs';
import validateDto from '../middleware/validate-dto.mjs';
import imageTypeCheck from '../middleware/imageCheckType.mjs';
import fileTypeCheck from '../middleware/fileCheckType.mjs';
import Writer from '../writer.mjs';

const router = express.Router();

// TEST the API
router.get('/ping', (req, res) => {
    Writer.jsonOutput(res, 'File API is replying', 200);
})


/// --- IMAGES --- ///
// GET an Image
router.get('/:layer/images/:name', ImageController.getImage);

// POST an Image
router.post('/:layer/images', validateDto(imageSchema), imageTypeCheck(), ImageController.postImage);

// DELETE an Image
router.delete('/:layer/images/:name', ImageController.deleteImage);

// PUT an Image
router.put('/:layer/images/:name', validateDto(imageSchema), imageTypeCheck(), ImageController.putImage);


/// --- FILES --- ///
// GET an File
router.get('/:layer/files/:name', FileController.getFile);

// POST an File
router.post('/:layer/files', validateDto(fileSchema), fileTypeCheck(), FileController.postFile);

// DELETE an File
router.delete('/:layer/files/:name', FileController.deleteFile);

// PUT an File
router.put('/:layer/files/:name', validateDto(fileSchema), FileController.putFile);


export default router;