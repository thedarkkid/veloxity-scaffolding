// Middleware file generated with Highway-CLI.

import Cors from 'cors';

// Listing allowed api URIs
const allowedURIs = [process.env.API_CONSUMER_URI];
export default Cors({
    origin:  (origin, callback) => {
        // Allow mobile apps and tests
        if(!origin) return callback(null, true);
        // Disallow origins not in the allowedURIs array
        if(allowedURIs.indexOf(origin) === -1) return callback(new Error("Not allowed by site CORS"), true);
        return callback(null, true);
    }
});