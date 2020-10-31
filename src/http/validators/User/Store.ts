import IValidator from "core/interfaces/validators/IValidator";
import {ModelHelper} from "_helpers_";
import Joi from "@hapi/joi";

class Store implements IValidator{
    protected static props = {
        firstname:{
            messages: ModelHelper.generateErrorMessagesObject("first name", 3,60, "string")
        },
        lastname:{
            messages: ModelHelper.generateErrorMessagesObject("last name", 3,60, "string")
        },
        email: {
            messages: ModelHelper.generateErrorMessagesObject("email", 5, 60, "string")
        },
        password:{
            messages: ModelHelper.generateErrorMessagesObject("password", 8,60, "string")
        },
        churches:{
            messages: ModelHelper.generateErrorMessagesObject("churches",3, 30, "array")
        },
        donations: {
            messages: ModelHelper.generateErrorMessagesObject("donations", 5, 60, "array")
        }
    };

    static validator = Joi.object({
        firstname: Joi.string().min(3).max(60).required().messages(Store.props.firstname.messages),
        lastname: Joi.string().min(3).max(60).required().messages(Store.props.lastname.messages),
        email: Joi.string().min(5).max(60).required().email().messages(Store.props.email.messages),
        password: Joi.string().min(8).max(60).pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{8,}$")).required().messages(Store.props.password.messages), // min 8 char, one uppercase, one lowercase, one number
        churches: Joi.array().items(Joi.string().length(24)).messages(Store.props.churches.messages),
        donations: Joi.array().items(Joi.string().length(24)).messages(Store.props.donations.messages)
    });
}

export default Store;