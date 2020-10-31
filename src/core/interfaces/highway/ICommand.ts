import ILooseObject from "./ILooseObject";

export default interface ICommand{
    commandString: string;
    flags?: ILooseObject;
    templatePath?: string;
    doCommand: (...args: string[]) => void
}