import express from "express";

const forceJsonResponse = (req:express.Request, res:express.Response, next:express.NextFunction):void => {
    res.set('Content-Type', 'application/json');
    next();
};

export default forceJsonResponse;
