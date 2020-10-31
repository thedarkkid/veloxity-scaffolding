import {Document} from "mongoose";

export interface IUserModel extends Document{
    firstname?:string;
    lastname?:string;
    username?:string;
    email?:string;
    password?:string;
    resetPasswordExpires?:string;
    resetPasswordToken?:string;
    created_at?:Date;
    updated_at?:Date;
}
