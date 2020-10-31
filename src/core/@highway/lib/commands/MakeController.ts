// Command File generated with Highway-CLI

import ICommand from "core/interfaces/highway/ICommand";
import Echo from "helpers/Echo";
import Config from "helpers/Config";
import {dash} from "../Handler";
import IMessageObject from "core/interfaces/highway/IMessageObject";
import Messages from "helpers/Messages";
import Generator from "helpers/Generator";
import {capitalize} from "helpers/Utility";
import ILooseObject from "core/interfaces/ILooseObject";
import LoaderLoad from "./LoaderLoad";

export default class MakeController implements ICommand {
    public commandString: string = "make:controller";
    templatePath: string = Config.getTemplatesDir("controller.ejs"); // run "node highway make:template controller.ejs" to generateCode template file.
    public flags: ILooseObject = {rest: false}; // all flags to be used in your doCommand will dynamically be added to this property.
    public doCommand = (filename: string):void => {
        const _type:string = (this.flags.rest) ? "rest": "";

        dash.message("Computing config options...");

        // Creating config options
        const fnWithoutLang: string = (filename.substr(filename.length-3) === "."+Config.lang) ? filename.slice(0, -3) : filename;
        const baseName:string = (fnWithoutLang.substr(fnWithoutLang.length-10).toLowerCase() === "controller")? fnWithoutLang.slice(0, -10) : fnWithoutLang;

        const className: string = capitalize(baseName)+"Controller";
        const fileName:string = className+"."+Config.lang;

        dash.message(`Generating${" "+_type} controller...`);

        // Creating template File
        const templatePath: string = (_type === "")? this.templatePath : Config.getTemplatesDir("restcontroller.ejs");
        Generator.generateFile(templatePath, {className, modelName:capitalize(baseName)}, Config.getControllersDir(fileName));

        const fileType: string = (_type === "")? "Controller" : "Rest controller";
        const msg: IMessageObject = {relPath:fileName, absPath:Config.getControllersDir(fileName), className, type: fileType};
        Echo.success(Messages.FILE_GENERATED_MESSAGE(msg));

        // Generate loader index file.
        const loadCommand = new LoaderLoad();
        loadCommand.doCommand("controllers");
    };
}
