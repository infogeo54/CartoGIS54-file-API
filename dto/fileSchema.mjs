import Joi from 'joi'
import { accessSync, constants } from 'fs'

/**
 * A Joi Schema for the file request body
 * 
 * @type { Joi.ObjectSchema } - A Joi Schema
 * @param { Joi.ObjectSchema } file - A Joi Schema for the file attribute  
 */
const fileSchema = Joi.object({
    file: Joi.object({
        path: Joi
                .string()
                .custom((value, helpers) => {
                    try {
                        accessSync(value, constants.F_OK);
                    } catch (error) {
                        return helpers.error("any.invalid")
                    }
                })
                .required()
                .messages({'any.invalid': "Upload failed"})
    }).required()
})

export default fileSchema 