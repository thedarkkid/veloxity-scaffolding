import Joi from "@hapi/joi";
import {ModelHelper} from "_helpers_";
import IValidator from "core/interfaces/validators/IValidator";

class Register implements IValidator{
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

    static validator =  Joi.object({
        username: Joi.string().alphanum().min(3).max(30).required().messages(Register.props.username.messages),
        email: Joi.string().min(5).max(60).required().email().messages(Register.props.email.messages),
        password: Joi.string().min(8).max(60).pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{8,}$")).required().messages(Register.props.password.messages), // min 8 char, one uppercase, one lowercase, one number
        firstname: Joi.string().min(3).max(60).messages(Register.props.firstname.messages),
        lastname: Joi.string().min(3).max(60).messages(Register.props.lastname.messages)
    });
}

export default Register;