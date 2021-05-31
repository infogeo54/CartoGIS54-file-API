import express from 'express';
import formData from 'express-form-data';
import os from 'os';
import router from './routes/index.mjs';
import apiErrorHandler from './error/api-error-handler.mjs';

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

app.use('/', router);

app.use(apiErrorHandler);

const port = process.env.PORT || 8888;
app.listen(port, () => console.log(`Listening on port ${port}`));