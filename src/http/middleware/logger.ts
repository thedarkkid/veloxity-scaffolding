import "dotenv/config";
import express from "express";
import fs from "fs";
import Files from "core/helpers/Files";

const createResponseString = (responseBody:string, responseTime:string, responseStatus:number) =>{
    return `Response-Status: ${responseStatus} \n` +
        `Response-Body: ${responseBody} \n` +
        `Response at ${responseTime} \n`;
};

export const saveLogToFile = (log:string)=>{
    const devEnvironment:string = process.env.DEV_ENVIRONMENT;

    // create date
    const date:Date = new Date();
    const dateString:string = `${date.getDay()}-${date.getMonth()+1}-${date.getFullYear()} (${date.toDateString()})`;
    let filePath = "";
    if(devEnvironment){
        filePath = Files.projectBaseDir(process.env.DEV_LOG_DIR)+"\\"+dateString+".log";
        fs.appendFile(filePath, log, (err)=>{if(err) throw err;});
    }else{
        filePath = Files.projectBaseDir(process.env.LOG_DIR)+"\\"+dateString+".log";
        fs.appendFile(filePath, log, null);
    }
};

const logger = (req:express.Request, res:express.Response, next:express.NextFunction):void=>{
    let log = "|***LOG***|\n";

    // request variables.
    const requestTime = new Date().toTimeString();
    const requestMethod = req.method;
    const requestBody = JSON.stringify(req.body);
    const requestParams = JSON.stringify(req.params);
    const requestUrl = `${req.protocol}://${req.get('host')}${req.originalUrl}`;
    const requestPath = req.path;

    // response variables
    let responseBody = null;
    let responseTime = null;
    let responseStatus = null;

    // create request string;
    const requestString =
    `Request at ${requestTime}\n`+
    `${requestMethod} Request to ${requestPath} \n`+
    `Request-URL: ${requestUrl}\n`+
    `Request-Body: ${requestBody}\n`+
    `Request-Parameters: ${requestParams}\n`;

    // log response
    const oldSend = res.send;
    res.send = (data) => {
        // define response variables
        responseBody = JSON.stringify(data);
        responseTime = new Date().toTimeString();
        responseStatus = res.statusCode;

        // create response string
        const responseString = createResponseString(responseBody, responseTime, responseStatus);

        // create log;
         log += requestString+responseString+"\n";

        // log the log
        saveLogToFile(log);

        // return res.send to its original state
        res.send = oldSend;
        return res.send(data);
    };
    next();
};

export default logger;