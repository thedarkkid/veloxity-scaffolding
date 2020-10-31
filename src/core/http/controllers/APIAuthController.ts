import express from "express";
import bcrypt from "bcryptjs";
import JWT from "jsonwebtoken";
import {Document, Model} from "mongoose";
import ILooseObject from "core/interfaces/ILooseObject";
import IValidator from "core/interfaces/validators/IValidator";
import IAPIAuthController from "core/interfaces/controllers/auth/IAPIAuthController";
import {AuthorizationHelper, ModelHelper, ResponseHelper} from "_helpers_";
import {GetPasswordResetLinkValidator, ResetPasswordValidator, TokenValidator} from "_http_/validators/Defaults";
import Mailer from "core/helpers/Mailer";
import IMailerMessage from "core/interfaces/helpers/IMailerMessage";
import {SentMessageInfo} from "nodemailer";
import {log} from "core/helpers/Utility";
import Generator from "core/helpers/Generator";
import Config from "core/helpers/Config";

class APIAuthController implements IAPIAuthController{
    protected Model:Model<Document>;
    protected LoginValidator:IValidator;
    protected RegisterValidator:IValidator;
    protected GetPasswordResetLinkValidator:IValidator;
    protected ResetPasswordValidator:IValidator;

    constructor(model:Model<Document>, loginValidator:IValidator, registerValidator:IValidator, getPasswordResetLinkValidator?:IValidator, resetPasswordValidator?:IValidator) {
        this.Model = model;
        this.LoginValidator = loginValidator;
        this.RegisterValidator = registerValidator;
        this.GetPasswordResetLinkValidator = (getPasswordResetLinkValidator)? getPasswordResetLinkValidator :GetPasswordResetLinkValidator;
        this.ResetPasswordValidator = (resetPasswordValidator)? resetPasswordValidator : ResetPasswordValidator;
        return this;
    }

    register = async (req:express.Request, res:express.Response):Promise<any> => {
        // create new document object from request and validate request object
        const documentObject =  await this.RegisterValidator.validator.validateAsync(ModelHelper.sanitizeObjValues(req.body), {abortEarly: false});

        // check if document already exists using email
        const emailExist = await this.Model.findOne({email: documentObject.email});
        if(emailExist) return ResponseHelper.error(res, "Email already exists");

        // check if document already exists using username
        const usernameExists = await this.Model.findOne({username: documentObject.username});
        if(usernameExists)return ResponseHelper.error(res, "Username already exists");

        // hash password and add to new document object
        const salt = await bcrypt.genSalt(parseInt(process.env.BCRYPT_SALT_ROUNDS, 10));
        documentObject.password = await bcrypt.hash(documentObject.password, salt);

        // register document and output new document
        const user = await new this.Model(documentObject).save();
        // create and assign a token
        const token = JWT.sign({_id: user._id}, process.env.TOKEN_SECRET, {expiresIn: process.env.JWT_EXPIRATION});

        // assign return token and document object as response
        res.header(AuthorizationHelper.fieldName, "Bearer "+token);
        return ResponseHelper.jsonResponse(res, {user, token})
    };

    login = async (req:express.Request, res:express.Response):Promise<any> =>{
        // validate request body
        const documentObject = await this.LoginValidator.validator.validateAsync(ModelHelper.sanitizeObjValues(req.body), {abortEarly: false});

        // create user variable
        let user:ILooseObject = {};

        // if login was done with email
        if(documentObject.email){
            // check if user with email exists
            user = await this.Model.findOne({email: documentObject.email});
            if(!user)return ResponseHelper.error(res, "email or password incorrect");
        }else{
            // check if user with username exists
            user = await this.Model.findOne({username: documentObject.username});
            if(!user)return ResponseHelper.error(res, "username or password incorrect");
        }

        // check if password is correct
        // @ts-ignore
        const validPass = await bcrypt.compare(documentObject.password, user.password);
        if(!validPass)return ResponseHelper.error(res, "login or password incorrect");

        // create and assign a token
        const token = JWT.sign({_id: user._id}, process.env.TOKEN_SECRET, {expiresIn: process.env.JWT_EXPIRATION});

        // assign return token and user object as response
        res.header(AuthorizationHelper.fieldName, "Bearer "+token);
        return ResponseHelper.jsonResponse(res, {user, token})

    };

    getPasswordResetLink = async (req:express.Request, res:express.Response):Promise<any> => {
        let requestBody:ILooseObject = ModelHelper.sanitizeObjValues(req.body);
        requestBody = await this.GetPasswordResetLinkValidator.validator.validateAsync(requestBody, {abortEarly: false});

        const entity = await this.Model.findOne({email: requestBody.email});
        if(!entity) throw Error(`Entity with email ${requestBody.email} not found.`);

        const uniqueId: string = entity._id+entity.get("email");
        const token: string = Generator.generateResetToken(uniqueId+new Date().getTime());
        const expiry: number = Date.now() + 3600000; // 1 hour = 3600000

        await this.Model.updateOne({_id: entity._id}, {
            $set: {resetPasswordToken: token, resetPasswordExpires: expiry}
        });

        const updatedEntity = await this.Model.findOne({email: requestBody.email});
        const mailer:Mailer = new Mailer({type: "reset"});
        const message: IMailerMessage = {to: requestBody.email, from: process.env.MAIL_FROM_ADDRESS,
            subject: "Forgot Password", meta: {link: this.getPWResetURI(token), username: updatedEntity.get("username")}, message:""};
        const info:SentMessageInfo = await mailer.mail(message);

        log(`Message sent: ${info.messageId}`);
        ResponseHelper.jsonResponse(res, `Reset Password Email Successfully sent to ${requestBody.email}`);
    };

    // tslint:disable-next-line:no-empty
    resetPassword = async (req:express.Request, res:express.Response):Promise<any> => {
        // Check if token exists and is not expired.
        const token: string = (await TokenValidator.validator.validateAsync(ModelHelper.sanitizeObjValues(req.params), {abortEarly: false})).token;
        const entity = await this.Model.findOne({resetPasswordToken: token, resetPasswordExpires: {$gt: Date.now()}});
        if(!entity) throw Error(`Password reset token is invalid or expired.`);

        // Get and validate password.
        const password: string = (await this.ResetPasswordValidator.validator.validateAsync(ModelHelper.sanitizeObjValues(req.body), {abortEarly: false})).password;

        // hash password.
        const salt = await bcrypt.genSalt(parseInt(process.env.BCRYPT_SALT_ROUNDS, 10));
        const hashedPassword: string = await bcrypt.hash(password, salt);

        // Update model object with new password.
        await this.Model.updateOne({_id: entity._id}, {
            $set: {password: hashedPassword, resetPasswordToken: null, resetPasswordExpires: null}
        });

        // Get updated user from the database.
        const newEntity = await this.Model.findOne({_id: entity._id});
        ResponseHelper.jsonResponse(res, {user: newEntity});
    };

    protected getPWResetURI = (token: string) => {
        return  Config.userPasswordResetURI(token);
    }
}

export default APIAuthController;