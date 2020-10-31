// Command File generated with Highway-CLI.

import ICommand from "core/interfaces/highway/ICommand";
import Echo from "helpers/Echo";
import Config from "helpers/Config";
import ILooseObject from "core/interfaces/ILooseObject";
import {dash} from "../Handler";
import {capitalize, lowerlize} from "helpers/Utility";
import Generator from "helpers/Generator";
import IMessageObject from "core/interfaces/highway/IMessageObject";
import Messages from "helpers/Messages";
import LoaderLoad from "./LoaderLoad";

export default class MakeResource implements ICommand {

    public commandString: string = "make:resource";
    templatePath: string = Config.getTemplatesDir("resource.ejs"); // run "node highway make:template resource.ejs" to generateCode template file.
    public flags: ILooseObject = {}; // all flags to be used in your doCommand will dynamically be added to this property. Include your default flag values there for intellisense purposes.
    public doCommand = (filename: string):void => {
        dash.message("Computing config options...");

        // Creating config options
        const fnWithoutLang: string = (filename.substr(filename.length-3) === "."+Config.lang) ? filename.slice(0, -3) : filename;
        const baseName:string = (fnWithoutLang.substr(fnWithoutLang.length-8).toLowerCase() === "resource")? fnWithoutLang.slice(0, -8) : fnWithoutLang;

        const className: string = capitalize(baseName)+"Resource";
        const fileName:string = className+"."+Config.lang;

        dash.message("Generating HTTPResource...");

        // Creating template File
        Generator.generateFile(this.templatePath, {name: baseName, lowerlize}, Config.getResourcesDir(fileName));
        const msg: IMessageObject = {relPath:fileName, absPath:Config.getResourcesDir(fileName), className, type: "HTTPResponse"};
        Echo.success(Messages.FILE_GENERATED_MESSAGE(msg));

        // Generate loader index file.
        const loadCommand = new LoaderLoad();
        loadCommand.doCommand("resource");
    };

}
