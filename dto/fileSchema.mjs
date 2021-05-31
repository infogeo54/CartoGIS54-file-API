import Joi from 'joi'
import { accessSync, constants } from 'fs'


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