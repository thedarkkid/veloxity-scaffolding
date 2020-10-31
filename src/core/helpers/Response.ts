/*Response Helper*/
/*
* mainly a couple of wrapper functions for express response methods
* */

import express from "express";
import ILooseObject from "core/interfaces/ILooseObject";

// wrapper function to return an error with express
export const error = (res:express.Response, _error:ILooseObject|string, errorCode?:string|number)=>{
    const errCode:string = (errorCode)? errorCode+"" : process.env.DEFAULT_ERROR_CODE;
    return res.status(parseInt(errCode, 10)).json({error: stringifyError(_error)}).end();
};

// return error string
const stringifyError = (_error: ILooseObject|string): string|ILooseObject => {
    if( _error instanceof Object && _error.hasOwnProperty("details")){
        const details: ILooseObject[] = _error.details;
        const newDetails: string[] = [];
        details.forEach((obj ) => {newDetails.push(obj.message)});
        return newDetails.toString();
    } else return (process.env.DEV_ENVIRONMENT === "true")? _error : _error.toString();
};

// wrapper function to return an error without ending middleware journey
export const sendError = (res:express.Response, _error:any, errorCode?:string|number)=>{
    const errCode:string = (errorCode)? errorCode+"" : process.env.DEFAULT_ERROR_CODE;
    return res.status(parseInt(errCode, 10)).send({error: _error.toString()});
};

// wrapper function to give return json response
export const jsonResponse = (res:express.Response, responseData:any)=>{
    if(!responseData.hasOwnProperty("meta")) responseData = {data: responseData};
    return res.json(responseData);
};

export const _console = (responseData: any) => {
    // tslint:disable-next-line:no-console
    console.log(responseData.toString());
};

export default {
    error,
    sendError,
    jsonResponse,
    console: _console
};
