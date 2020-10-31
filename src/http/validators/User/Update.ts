import IValidator from "core/interfaces/validators/IValidator";
import {ModelHelper} from "_helpers_";
import Joi from "@hapi/joi";

class Update implements IValidator{
    protected static props = {
        firstname:{
            messages: ModelHelper.generateErrorMessagesObject("first name", 3,60, "string")
        },
        lastname:{
            messages: ModelHelper.generateErrorMessagesObject("last name", 3,60, "string")
        },
        churches:{
            messages: ModelHelper.generateErrorMessagesObject("churches",3, 30, "array")
        },
        donations: {
            messages: ModelHelper.generateErrorMessagesObject("donations", 5, 60, "array")
        }
    };

    static validator = Joi.object({
        firstname: Joi.string().min(3).max(60).messages(Update.props.firstname.messages),
        lastname: Joi.string().min(3).max(60).messages(Update.props.lastname.messages),
        churches: Joi.array().items(Joi.string().length(24)).messages(Update.props.churches.messages),
        donations: Joi.array().items(Joi.string().length(24)).messages(Update.props.donations.messages)
    });
}

export default Update;