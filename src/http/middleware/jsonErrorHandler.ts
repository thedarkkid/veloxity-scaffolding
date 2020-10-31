// Middleware file generated with Highway-CLI.

import express from "express";
import {ResponseHelper} from "_helpers_";

const jsonErrorHandler = (err:express.ErrorRequestHandler, req:express.Request, res:express.Response, next:express.NextFunction):void => {
    ResponseHelper.error(res, err);
    next();
};

export default jsonErrorHandler;