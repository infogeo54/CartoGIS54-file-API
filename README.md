# CartoGIS54 file API
__A REST API to manage and store locally files and images for [the CartoGIS54 app](https://github.com/infogeo54/CartoGIS54).__

## Description 
It uses [Node.js](https://nodejs.org/) with the framework [Express.js](https://expressjs.com/fr/) and [fs, the Node's file-system module](https://nodejs.org/api/fs.html).

The files and images are stored in the data folder following this tree folder.

- data
   - layer1
        - files
            - someFileOfLayer1.txt
            - anotherFileOfLayer1.pdf
        - images
            - someImageOfLayer1.png
            - anotherImageOfLayer1.gif
   - layer2
        - files
            - someFileOfLayer2.txt
            - anotherFileOfLayer2.pdf
        - images
            - someImageOfLayer2.png
            - anotherImageOfLayer2.gif

## Routes
The following tables shows the different routes you can use, how to forge the request body and the type of response you will get

### :rotating_light: Errors
 In case of a bad request or an internal error, a error message in JSON will be send instead of the normal response. 

### Test 
| Routes | Request body | Response
| --- | --- | ---
| GET /ping | None | JSON : The success of the communication with the API

### Files
| Routes | Request body | Response
| --- | --- | ---
| GET /:layer/files/:filename | None | BLOB : The file 
| POST /:layer/files/ | - Content-type : "multipart/form-data" <br>  - Field "file" : the file to post | JSON : the new name of the file and its directory name 
| DELETE /:layer/files/:filename | None | JSON : the success of the delete request
| PUT /:layer/files/:filename | - Content-type : "multipart/form-data" <br>  - Field "file" : the new file to post | JSON : the new name of the file, its directory name and the success of the delete of the old file 

### Images
| Routes | Request body | Response
| --- | --- | ---
| GET /:layer/images/:filename | None | BLOB : The image 
| POST /:layer/images/ | - Content-type : "multipart/form-data" <br>  - Field "image" : the file to post | JSON : the new name of the image and its directory name 
| DELETE /:layer/images/:filename | None | JSON : the success of the delete request
| PUT /:layer/images/:filename | - Content-type : "multipart/form-data" <br>  - Field "image" : the new file to post | JSON : the new name of the image, its directory name and the success of the delete of the old image 
