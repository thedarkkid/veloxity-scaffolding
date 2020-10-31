// Validator file generated with Highway-CLI.
import IValidator from "core/interfaces/validators/IValidator";
import {ModelHelper} from "_helpers_";
import Joi from "@hapi/joi";

export default class GetPasswordResetLink implements IValidator{
    protected static props = {
        email:{
            messages: ModelHelper.generateErrorMessagesObject("email", 3,3, "email string") // error messages generator.
        }
    };

    static validator = Joi.object({
        email: Joi.string().min(5).max(60).required().email().messages(GetPasswordResetLink.props.email.messages),
    });
}

