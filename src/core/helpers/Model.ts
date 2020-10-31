import ILooseObject from "core/interfaces/ILooseObject";
import Sanitizer from 'sanitize-html';

const sanitizerOptions: ILooseObject = {
        allowedTags: [],
        allowedAttributes: {},
        disallowedTagsMode: "recursiveEscape"
    };

    export const requiredErrorString = (column:string): string =>{
        return `${column} is required`;
    };

    export const typeErrorString = (column:string, type:string):string =>{
        return `${column} cannot has to be of type ${type}`;
    };

    export const minLengthErrorString = (column:string, len:number) =>{
        return `${column} should have a minimum length of ${len}`;
    };

    export const maxLengthErrorString = (column:string, len:number) =>{
        return `${column} should have a maximum length of ${len}`;
    };

    export const emptyErrorString = (column:string) =>{
        return `${column} cannot be empty`
    };

    export const patternErrorString = (column: string) => {
        return `${column} does not follow the required rules:\n ${column} should contain at least one capital letter, one number and must be longer than eight characters.`;
    };

    export const generateErrorMessagesObject = (column:string, minLength:number, maxLength:number, columnType:string) =>{
        return {
            "string.base": typeErrorString(column, columnType),
            "string.empty": emptyErrorString(column),
            "string.min": minLengthErrorString(column, minLength),
            "string.max": maxLengthErrorString(column, maxLength),
            "string.pattern.base": patternErrorString(column),
            "any.required": requiredErrorString(column)
        }
    };

    export const sanitizeObjValues = (obj:ILooseObject):ILooseObject=>{
        for (const [key, value] of Object.entries(obj)) {
            if(isObject(obj[key])) sanitizeObjValues(obj[key]);
            else{
                obj[key] = Sanitizer(value, sanitizerOptions).toString().trim();
            }
        }
        return obj;
    };

    export const isObject = (val:any) => {
        if (val === null) { return false;}
        return ( (typeof val === 'function') || (typeof val === 'object') );
    };

    export const sanitizeString = (value: string): string => {
        return Sanitizer(value, sanitizerOptions).toString().trim();
    };


const Model = {
    isObject,
    requiredErrorString,
    typeErrorString,
    sanitizeObjValues,
    generateErrorMessagesObject,
    emptyErrorString,
    minLengthErrorString,
    maxLengthErrorString,
    sanitizeString
};

export default Model;