// Validator file generated with Highway-CLI.
import IValidator from "core/interfaces/validators/IValidator";
import {ModelHelper} from "_helpers_";
import Joi from "@hapi/joi";

export default class GetPasswordResetLink implements IValidator{
    protected static props = {
        getPasswordResetLinkName:{
            messages: ModelHelper.generateErrorMessagesObject("name", 3,3, "string") // error messages generator.
        }
    };

    static validator = Joi.object({
        getPasswordResetLinkName: Joi.string().min(3).max(3).required().messages(GetPasswordResetLink.props.getPasswordResetLinkName.messages) // Joi validator object.

    });
}

