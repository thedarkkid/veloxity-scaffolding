import HTTPResource from "core/http/resources/HTTPResource";
import ILooseObject from "core/interfaces/ILooseObject";
import {Document} from "mongoose";

export default class DefaultResource extends HTTPResource<Document>{
    constructor() {
        super();
    }

    transformObject = (doc: Document): ILooseObject => {
        return {
            ...doc.toObject()
        };
    };

    with = {
        author: "thedarkkid.codes@gmail.com",
        license: "MIT",
        version: "1.5"
    };

}

export const defaultResource = new DefaultResource();
