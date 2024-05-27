//----------JOI VALIDATOR TO VALIDATE USER INPUTS-----------------
import Joi from "joi"

const validator = (schema: Joi.ObjectSchema<any>) => (payload: any) =>
  schema.validate(payload, { abortEarly: true })
const adminValidation = Joi.object({
  adminID: Joi.string().min(6).max(6).required(),
  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).required()
})
const validateAdmin = validator(adminValidation)
export default validateAdmin
