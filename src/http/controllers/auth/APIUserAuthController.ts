import User from "models/User";
import {LoginValidator, RegisterValidator} from "_http_/validators/User";
import APIAuthController from "core/http/controllers/APIAuthController";
import {Controller} from "core/helpers/Decorators";

@Controller()
class APIUserAuthController extends APIAuthController {
    private static _instance: APIUserAuthController;

    constructor( ) {
        super(User, LoginValidator, RegisterValidator);
    }

    public static get Instance()
    {
        return this._instance || (this._instance = new this());
    }


}

export default APIUserAuthController.Instance;