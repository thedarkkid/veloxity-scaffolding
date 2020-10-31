import HTTPResource from "core/http/resources/HTTPResource";
import {IUserModel} from "core/interfaces/models/IUserModel";
import ILooseObject from "core/interfaces/ILooseObject";
import {Document} from "mongoose";

export default class UserResource extends HTTPResource<Document>{
    constructor() {
        super();
    }

    transformObject = (user: IUserModel): ILooseObject => {
        const name: string = (user.firstname && user.lastname) ? user.firstname+" "+user.lastname : "";

        return {
            id: user._id,
            user: user.username,
            email: user.email,
            name,
            resetTokenExpiry: user.resetPasswordExpires,
            resetToken: user.resetPasswordToken,
            created: user.created_at,
            modified: user.updated_at,
        };
    };

    with = {
        author: "thedarkkid.codes@gmail.com",
        license: "MIT",
        version: "1.5"
    };
}

export const userResource = new UserResource();