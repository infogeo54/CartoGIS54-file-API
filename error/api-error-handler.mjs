import Writer from "../writer.mjs";
import ApiError from "./api-error.mjs";


function apiErrorHandler(err, req, res, next) {
    if (err instanceof ApiError) return Writer.jsonOutput(res, err.message, err.code);
    return Writer.jsonOutput(res, err, 500)
}

export default apiErrorHandler;