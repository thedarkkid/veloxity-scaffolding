import express from "express";

export const wrapAsync = (fn:any) => {
    return (req:express.Request, res:express.Response, next:express.NextFunction) => {
        // Make sure to `.catch()` any errors and pass them along to the `next()`
        // middleware in the chain, in this case the error handler.
        fn(req, res, next).catch(next);
    };
};

export default {
    wrapAsync
};