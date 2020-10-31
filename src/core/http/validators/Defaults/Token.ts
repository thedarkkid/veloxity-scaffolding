// Validator file generated with Highway-CLI.
import IValidator from "core/interfaces/validators/IValidator";
import {ModelHelper} from "_helpers_";
import Joi from "@hapi/joi";

export default class Token implements IValidator{
    protected static props = {
        token:{
            messages: ModelHelper.generateErrorMessagesObject("token", 20,100, "Token string") // error messages generator.
        }
    };

    static validator = Joi.object({
        token: Joi.string().min(20).max(100).required().messages(Token.props.token.messages),
    });
}

