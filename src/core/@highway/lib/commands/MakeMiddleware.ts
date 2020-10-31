// Command File generated with Highway-CLI.

import ICommand from "core/interfaces/highway/ICommand";
import Echo from "helpers/Echo";
import Config from "helpers/Config";
import ILooseObject from "core/interfaces/ILooseObject";
import {dash} from "../Handler";
import {lowerlize} from "helpers/Utility";
import Generator from "helpers/Generator";
import IMessageObject from "core/interfaces/highway/IMessageObject";
import Messages from "helpers/Messages";
import LoaderLoad from "./LoaderLoad";

export default class MakeMiddleware implements ICommand {
    public commandString: string = "make:middleware";
    templatePath: string = Config.getTemplatesDir("middleware.ejs"); // run "node highway make:template middleware.ejs" to generateCode template file.
    public flags: ILooseObject = {}; // all flags to be used in your doCommand will dynamically be added to this property. Include your default flag values there for intellisense purposes.
    public doCommand = (filename: string):void => {
        dash.message("Computing config...");

        // Checking if filename argument has "lang" file extension and adding it.
        const fnWithoutLang: string = (filename.substr(filename.length-3) === "."+Config.lang) ? filename.slice(0, -3) : filename;
        const functionName: string = lowerlize(fnWithoutLang);
        const _fileName: string = functionName+"."+Config.lang;

        // Displaying loading information.
        dash.message("Generating middleware file...");

        // Generate absolute path.
        const absPath:string = Config.getMiddlewareDir(_fileName);

        // Creating template File
        Generator.generateFile(this.templatePath, {functionName}, absPath);

        const msg: IMessageObject = {relPath:_fileName, absPath, className:filename, type: "Middleware"};
        Echo.success(Messages.FILE_GENERATED_MESSAGE(msg));

        // Generate loader index file.
        const loadCommand = new LoaderLoad();
        loadCommand.doCommand("middleware");
    };
}
