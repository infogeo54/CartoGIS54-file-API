import path from 'path';
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const baseRoute = path.join(__dirname, 'data');

export { __dirname, baseRoute }