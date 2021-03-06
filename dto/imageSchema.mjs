import Joi from 'joi'
import { accessSync, constants } from 'fs'


/**
 * A Joi Schema for the image request body
 * 
 * @type { Joi.ObjectSchema } - A Joi Schema
 * @param { Joi.ObjectSchema } image - A Joi Schema for the image attribute  
 */
const imageSchema = Joi.object({
    image: Joi.object({
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

export default imageSchema 