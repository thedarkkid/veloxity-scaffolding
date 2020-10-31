// Middleware file generated with Highway-CLI.

import express from "express";

const superUser = (req:express.Request, res:express.Response, next:express.NextFunction):void => {
    // tslint:disable-next-line:no-console
    console.log("super user");
    next();

};

export default superUser;