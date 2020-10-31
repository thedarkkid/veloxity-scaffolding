import express from "express";
import bcrypt from "bcryptjs";
import IController from 'core/interfaces/controllers/IController';
import IValidator from "core/interfaces/validators/IValidator";
import {Document, Model} from "mongoose";
import {sanitizeObjValues, sanitizeString} from "core/helpers/Model";
import ILooseObject from "core/interfaces/ILooseObject";
import HTTPResource from "core/http/resources/HTTPResource";
import DefaultResource from "http/resources/DefaultResource";
import {jsonResponse} from "core/helpers/Response";

class RESTAPIController implements IController{
    protected Model:Model<Document>; // Model for the application
    protected StoreValidator:IValidator; // IValidator for the store function
    protected UpdateValidator:IValidator; // IValidator for the store function
    protected ResponseResource: HTTPResource<Document>; // Data transfer object.

    constructor(ControllerModel:Model<Document>, ControllerStoreValidator:IValidator, ControllerUpdateValidator:IValidator, responseResource?: HTTPResource<Document>) {
        this.Model = ControllerModel;
        this.StoreValidator = ControllerStoreValidator;
        this.UpdateValidator = ControllerUpdateValidator;
        this.ResponseResource = (responseResource)? responseResource : new DefaultResource();
        return this;
    }

    // returns all documents from the resource
    index = async (req:express.Request, res:express.Response)=> {
        const documents: Document[] =  await this.Model.find();
        jsonResponse(res, this.ResponseResource._collection(documents));
    };

    // returns a single document by id from the resource
    show = async (req:express.Request, res:express.Response) => {
        const document: Document = await this.Model.findById(sanitizeString(req.params.id.trim()));
        jsonResponse(res, this.ResponseResource._single(document));
    };

    // stores a single document in the resource
    store = async (req:express.Request, res:express.Response) => {
        let requestBody:ILooseObject = sanitizeObjValues(req.body as Document);
        requestBody = await this.StoreValidator.validator.validateAsync(requestBody, {abortEarly: false});

        const document = new this.Model(requestBody);
        const savedDocument = await document.save();
        jsonResponse(res, this.ResponseResource._single(savedDocument));
    };

    // store a single document with password in the resource
    protected storeWithPassword = async (req:express.Request, res:express.Response) => {
        let requestBody:ILooseObject = sanitizeObjValues(req.body as Document);
        requestBody = await this.StoreValidator.validator.validateAsync(requestBody, {abortEarly: false});

        // hash password and add to new document object
        const salt = await bcrypt.genSalt(parseInt(process.env.BCRYPT_SALT_ROUNDS, 10));
        requestBody.password = await bcrypt.hash(requestBody.password, salt);

        const document = new this.Model(requestBody);
        const savedDocument = await document.save();
        jsonResponse(res, this.ResponseResource._append(savedDocument)._single(savedDocument));
    };

    // updates a single document from the resource by id
    update = async (req:express.Request, res:express.Response) => {
        let requestBody:ILooseObject = sanitizeObjValues(req.body as Document);
        requestBody = await this.UpdateValidator.validator.validateAsync(requestBody, {abortEarly: false});

        const id = sanitizeString(req.params.id);
        const updatedDocument = await this.Model.updateOne({_id: id}, {
            $set: requestBody
        });

        const document = await this.Model.findById(id);
        jsonResponse(res, this.ResponseResource._append(updatedDocument)._single(document));
    };

    // deletes a single document from the resource by id
    destroy = async (req:express.Request, res:express.Response) => {
        const id = sanitizeString(req.params.id);
        const document = await this.Model.findById(id);
        const removedDocument = await this.Model.deleteOne({_id: id});
        jsonResponse(res, this.ResponseResource._append(removedDocument)._single(document));
    }

}

export default RESTAPIController;