// Validator file generated with Highway-CLI.
import IValidator from "core/interfaces/validators/IValidator";
import {ModelHelper} from "_helpers_";
import Joi from "@hapi/joi";

export default class ResetPassword implements IValidator{
    protected static props = {
        password:{
            messages: ModelHelper.generateErrorMessagesObject("password", 8,60, "string")
        }
    };

    static validator = Joi.object({
        password: Joi.string().min(8).max(60).pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{8,}$")).required().messages(ResetPassword.props.password.messages), // min 8 char, one uppercase, one lowercase, one number
    });
}

