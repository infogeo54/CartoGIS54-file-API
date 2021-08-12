# CartoGIS54 file API

## Description 
A REST API to manage and store locally files and images for [the Cartgis54 app](https://github.com/infogeo54/CartoGIS54).

It uses [Node.js](https://nodejs.org/) with the framework [Express.js](https://expressjs.com/fr/) and the [fs, Node's file-system module](https://nodejs.org/api/fs.html).

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

---

## Routes
The following tables shows the different routes you can use, how to forge the request body and the type of response you will get

:rotating_light: In case of a bad request or an internal error, a error message in JSON will be send instead of the normal response. 

### Test 
| Routes | Request body | Response
| --- | --- | ---
| __`GET:`__ `/ping` | None | `JSON` : The success of the communication with the API

### Files
| Routes | Request body | Response
| --- | --- | ---
| __`GET:`__ `/:layer/files/:filename` | None | `BLOB` : The file 
| __`POST:`__ `/:layer/files/` | - `Content-type : "multipart/form-data"` <br>  - Field `file` : the file to post | `JSON` : the new name of the file and its directory name 
| __`DELETE:`__ `/:layer/files/:filename` | None | `JSON` : the success of the delete request
| __`PUT:`__ `/:layer/files/:filename` | - `Content-type : "multipart/form-data"` <br>  - Field `file` : the new file to post | `JSON` : the new name of the file, its directory name and the success of the delete of the old file 

### Images
| Routes | Request body | Response
| --- | --- | ---
| __`GET:`__ `/:layer/images/:filename` | None | `BLOB` : The image 
| __`POST:`__ `/:layer/images/` | - `Content-type : "multipart/form-data"` <br>  - Field `image` the file to post | `JSON` : the new name of the image and its directory name 
| __`DELETE:`__ `/:layer/images/:filename` | None | `JSON` : the success of the delete request
| __`PUT:`__ `/:layer/images/:filename` | - `Content-type : "multipart/form-data"` <br>  - Field `image` : the new file to post | `JSON` : the new name of the image, its directory name and the success of the delete of the old image 

## Config app
To config correctly the app, modify api.config.json following the [`model.api.config.json`](model.api.config.json).

If you want to pass the api in HTTPS, please create a pathToCert.json file and fill according to the [`model.pathToCert.json`](model.pathToCert.json).

The default port of the app is 8888. If you want to change it, please modify scripts in [`package.json`](package.json) by replacing every 8888 to the port number you want.

## Launch app
To launch the app, open a terminal in the root directory and run the following commands :
(_to install the dependecies_) 
```
npm install
```

(_to start the api_)
```
npm run start
```
(_or to start the api with nodemon : useful when coding_)
```
npm run start-dev
```