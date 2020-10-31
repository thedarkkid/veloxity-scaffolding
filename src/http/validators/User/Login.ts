import Joi from "@hapi/joi";
import {ModelHelper} from "_helpers_";
import IValidator from "core/interfaces/validators/IValidator";

class Login implements IValidator{
    protected static props = {
        username:{
            messages: ModelHelper.generateErrorMessagesObject("username",3, 30, "string")
        },
        email: {
            messages: ModelHelper.generateErrorMessagesObject("email", 5, 60, "string")
        },
        password:{
            messages: ModelHelper.generateErrorMessagesObject("password", 8,60, "string")
        },
        firstname:{
            messages: ModelHelper.generateErrorMessagesObject("first name", 3,60, "string")
        },
        lastname:{
            messages: ModelHelper.generateErrorMessagesObject("last name", 3,60, "string")
        }
    };

    static validator = Joi.object({
        username: Joi.string().alphanum().min(3).max(30).messages(Login.props.username.messages),
        email: Joi.string().min(5).max(60).email().messages(Login.props.email.messages),
        password: Joi.string().pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{8,}$")).required().messages(Login.props.password.messages) // min 8 char, one uppercase, one lowercase, one number
    }).xor("username","email");
}

export default Login;

