// tslint:disable:no-console

import express from "express";
import path from "path"
import mongoose from "mongoose";
import "dotenv/config";

import {
    CorsMiddleware,
    ForceJsonResponseMiddleware,
    JsonErrorHandlerMiddleware,
    LoggerMiddleware
} from "_http_/middleware";
import apiRoutes from "./routes/api";
import webRoutes from "./routes/web";
import {capitalize} from "core/helpers/Utility";

const app = express();

// Registering global utility functions.
app.locals.capitalize = capitalize;

// register middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(LoggerMiddleware);

// Add CORS to api
app.use("/api", [JsonErrorHandlerMiddleware, ForceJsonResponseMiddleware, CorsMiddleware]);

// assign routes prefixes
app.use('/api/v1', apiRoutes);
app.use('/', webRoutes);

// set static folder
app.use(express.static(path.join(__dirname, "static")));

// define server port
const port = process.env.PORT || 5000;

process.on('unhandledRejection', console.log);
// start server
app.listen(port, ()=>{
    try{
        console.log("connecting to database..");
        mongoose.connect(process.env.DB_CONNECTION, {useNewUrlParser: true, useUnifiedTopology: true});
        console.log("connected to database");
        console.log(`...server listening at port ${port}`);
    } catch (e){
        console.log({"db connection error": e.toString()});
    }
});

// Todo make error handler middleware work.