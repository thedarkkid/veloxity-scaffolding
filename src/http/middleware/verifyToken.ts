import express from 'express';
import JWT from "jsonwebtoken";
import {AuthorizationHelper, ResponseHelper} from "_helpers_";

const verifyToken =  (req:express.Request, res:express.Response, next:express.NextFunction) => {
    // tslint:disable-next-line:no-console
    if (typeof req.get(AuthorizationHelper.fieldName) !== 'string') {
        ResponseHelper.error(res, "No Authorization.");
        return;
    }
    // get auth header value
    const bearerHeader:string = req.get(AuthorizationHelper.fieldName).toString();

    // check if authorization was set
    if(!bearerHeader) ResponseHelper.error(res, "access denied", process.env.ACCESS_DENIED_ERROR_CODE);

    // split at the bearer
    const bearer = bearerHeader.split(' ');
    try{
        // @ts-ignore
        // get token from array and set the check the token, and set the token
        req.user = JWT.verify(bearer[1], process.env.TOKEN_SECRET);
    }catch (e) {
        // return error if there is an issue
        ResponseHelper.sendError(res, "invalid token");
    }

    next();
};

export default verifyToken;

