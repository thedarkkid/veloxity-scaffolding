/* tslint:disable:prefer-for-of */

import IMessageObject from "core/interfaces/highway/IMessageObject";

export const NOT_ENOUGH_ARGS_NAMED_ERROR = (...args: string[]):string => {
        const message = "Not enough arguments given, command takes: \n";
        let argsString = "";
        for(let i=0; i<args.length; i++){
            argsString += args[i] +", ";
        }
        return message+argsString+"in that order.";
};

export const INSUFFICIENT_ARGS_ERROR = (commandString:string, cliArgsLen: number, commandArgsLen: number):string => {
        return  `Command ${commandString} takes in ${commandArgsLen} arguments, ${cliArgsLen} given.`
};

export const NO_COMMAND_GIVEN_ERROR = (possibleCommands:string) :string => {
        return `No command received. \nExisting commands are:\n${possibleCommands}`;
};

export const COMMAND_NONEXISTENT_ERROR = (commandGiven:string, possibleCommands:string) :string => {
        return `command ${commandGiven} does not exist. \n\nExisting commands are:\n${possibleCommands}`;
};

export const MODULE_NONEXISTENT_ERROR = (moduleGiven:string, possibleModules:string) :string => {
        return `Module ${moduleGiven} does not exist and cannot be loaded. \n\nLoadable modules are:\n${possibleModules}`;
};

export const PATH_NONEXISTENT_ERROR = (filePath?: string): string => {
        return `Path ${filePath} is does not exist.`;
};

export const FILE_NONEXISTENT_ERROR = (filePath?: string): string => {
        return `File ${filePath} does not exist.`;
};


export const FILE_GENERATED_MESSAGE = (messageObj?: IMessageObject): string => {
    const msg = "File generated.";
    return (messageObj)? `${messageObj.type} file ${messageObj.className} generated at ${messageObj.relPath}.\nAbsolute file path at ${messageObj.absPath}` : msg;
};

export const MODULE_GENERATED_MESSAGE = (messageObj?: IMessageObject): string => {
    const msg = "Module generated.";
    return (messageObj)? `${messageObj.type} module ${messageObj.className} generated at ${messageObj.relPath}.\nAbsolute file path at ${messageObj.absPath}` : msg;
};

export default {
    NOT_ENOUGH_ARGS_NAMED_ERROR,
    INSUFFICIENT_ARGS_ERROR,
    NO_COMMAND_GIVEN_ERROR,
    COMMAND_NONEXISTENT_ERROR,
    MODULE_NONEXISTENT_ERROR,
    PATH_NONEXISTENT_ERROR,
    FILE_NONEXISTENT_ERROR,
    FILE_GENERATED_MESSAGE,
    MODULE_GENERATED_MESSAGE
}