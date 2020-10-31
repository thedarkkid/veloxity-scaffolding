import Joi from "@hapi/joi";

interface IValidator {
    auth?:boolean;
    validator?:Joi.ObjectSchema;
}

export default IValidator;