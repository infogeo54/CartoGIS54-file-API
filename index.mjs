import express from 'express';
import formData from 'express-form-data';
import os from 'os';
import router from './routes/index.mjs';
import apiErrorHandler from './error/api-error-handler.mjs';
import { readFile } from "fs/promises" 
import { readFileSync } from 'fs';
import https from 'https'

const app = express();
const formDataOptions = {
    uploadDir: os.tmpdir(),
    autoClean: true,
}
app.use(formData.parse(formDataOptions))
app.use(formData.format());
app.use(formData.stream());
app.use(formData.union());

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}))
app.use(async function (req, res, next) {
    const domainsAllowed = JSON.parse(await readFile(new URL('api.config.json', import.meta.url))).domainsAllowed
    if (domainsAllowed.indexOf(req.headers.origin) !== -1){
        res.header("Access-Control-Allow-Origin", req.headers.origin)
        res.header("Access-Control-Allow-Methods", "POST,GET,DELETE,PUT")
        res.header("Acces-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    }
    next();
})

app.use('/', router);
 
app.use(apiErrorHandler);
const pathToCert = JSON.parse(await readFile(new URL('pathToCert.json', import.meta.url)));
const server = https.createServer({
    key: readFileSync(pathToCert.key),
    cert: readFileSync(pathToCert.cert)
}, app);

const port = process.env.PORT;
server.listen(port, () => console.log(`Listening on port ${port}`));