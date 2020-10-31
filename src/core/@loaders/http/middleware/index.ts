// Loader Load file generated with Highway-CLI.

    // register cors middleware
    import Cors_ from "http/middleware/cors";
    export const CorsMiddleware =  Cors_;

    // register forceJsonResponse middleware
    import ForceJsonResponse_ from "http/middleware/forceJsonResponse";
    export const ForceJsonResponseMiddleware =  ForceJsonResponse_;

    // register jsonErrorHandler middleware
    import JsonErrorHandler_ from "http/middleware/jsonErrorHandler";
    export const JsonErrorHandlerMiddleware =  JsonErrorHandler_;

    // register logger middleware
    import Logger_ from "http/middleware/logger";
    export const LoggerMiddleware =  Logger_;

    // register superUser middleware
    import SuperUser_ from "http/middleware/superUser";
    export const SuperUserMiddleware =  SuperUser_;

    // register verifyToken middleware
    import VerifyToken_ from "http/middleware/verifyToken";
    export const VerifyTokenMiddleware =  VerifyToken_;



export default { 
    cors:CorsMiddleware, 
    forceJsonResponse:ForceJsonResponseMiddleware, 
    jsonErrorHandler:JsonErrorHandlerMiddleware, 
    logger:LoggerMiddleware, 
    superUser:SuperUserMiddleware, 
    verifyToken:VerifyTokenMiddleware,
};

