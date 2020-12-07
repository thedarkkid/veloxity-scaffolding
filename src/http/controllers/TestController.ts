// Controller file generated with Highway-CLI

import express from "express";
import {ResponseHelper} from "_helpers_";
import {Controller} from "helpers/Decorators";
import ILooseObject from "core/interfaces/ILooseObject";

@Controller()
class Test {
    private static _instance: Test;

    private constructor() {
    }

    method = async (req:express.Request, res:express.Response) => {
        return ResponseHelper.jsonResponse(res, {})
    };

    public static get Instance()
    {
        return this._instance || (this._instance = new this());
    }

}

export default Test.Instance;