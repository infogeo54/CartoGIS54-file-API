import path from 'path';
import { fileURLToPath } from 'url'

/** Recreate the __dirname that is not available in Node */
const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** Give the complePath to the data directory */
const baseRoute = path.join(__dirname, 'data');

export { __dirname, baseRoute }