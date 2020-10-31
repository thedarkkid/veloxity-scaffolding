import User from "models/User";
import RESTAPIController from "core/http/controllers/RESTAPIController";
import {StoreValidator, UpdateValidator} from "_http_/validators/User";
import express from "express";
import {Controller} from "core/helpers/Decorators";
import {userResource} from "http/resources/UserResource";

@Controller()
class UserController extends RESTAPIController{
    private static _instance: UserController;

    private constructor() {
        super(User, StoreValidator, UpdateValidator, userResource);
    }

    store = async (req:express.Request, res:express.Response) => {
        return this.storeWithPassword(req, res);
    };

    public static get Instance()
    {
        return this._instance || (this._instance = new this());
    }

}

export default UserController.Instance;