// tslint:disable:ban-templates

import ILooseObject from "core/interfaces/ILooseObject";
import {saveLogToFile} from "http/middleware/logger";


const STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;
const ARGUMENT_NAMES = /([^\s,]+)/g;

export const capitalize  = (_string: string):string =>  {
    return _string.charAt(0).toUpperCase() + _string.slice(1);
};

export const lowerlize  = (_string: string):string =>  {
    return _string.charAt(0).toLowerCase() + _string.slice(1);
};

export const getParamNames = (func: Function): string[] =>  {
    const fnStr: string = func.toString().replace(STRIP_COMMENTS, '');
    let result: string[] = fnStr.slice(fnStr.indexOf('(')+1, fnStr.indexOf(')')).match(ARGUMENT_NAMES);
    if(result === null) result = [];
    return result;
};

export const objectFilterOut = (obj: ILooseObject, key: string): ILooseObject => {
    const result: ILooseObject = {};
    for (const k in obj){
        if(k !== key) result[k] = obj[k];
    }
    return result;
};

export const objectFilterIn = (obj: ILooseObject, key: string): ILooseObject => {
    const result: ILooseObject = {};
    for (const k in obj){
        if(k === key) result[k] = obj[k];
    }
    return result;
};

export const log = (logData: any): void => {
    saveLogToFile( "|***LOG***|\n"+logData.toString()+"\n");
};

export const _either = <T>(either: T, or: T, _default?: T): T => (either) ? either : ((or) ? or : _default);

export default   {
    capitalizeFirstLetter: capitalize,
    lowerlize,
    getParamNames,
    objectFilterOut,
    objectFilterIn,
    log
};