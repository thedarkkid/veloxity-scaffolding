// Command File generated with Highway-CLI.

import ICommand from "core/interfaces/highway/ICommand";
import Echo from "helpers/Echo";
import Config from "helpers/Config";
import ILooseObject from "core/interfaces/ILooseObject";
import {dash} from "../Handler";
import {capitalize} from "helpers/Utility";
import Generator from "helpers/Generator";
import IMessageObject from "core/interfaces/highway/IMessageObject";
import Messages from "helpers/Messages";
import LoaderLoad from "./LoaderLoad";

export default class MakeHelper implements ICommand {
    public commandString: string = "make:helper";
    templatePath: string = Config.getTemplatesDir("helpers/default.ejs"); // run "node highway make:template helper.ejs" to generateCode template file.
    public flags: ILooseObject = {decorator: false, class: false, object: false}; // all flags to be used in your doCommand will dynamically be added to this property.
    public doCommand = (filename: string): void => {
        if(this.flags.decorator) this.makeHelper(filename, "decorator.ejs");
        else if(this.flags.class) this.makeHelper(filename, "class.ejs");
        else if(this.flags.object) this.makeHelper(filename, "object.ejs");
        else this.makeHelper(filename, "default.ejs");

        // Generate loader index file.
        const loadCommand = new LoaderLoad();
        loadCommand.doCommand("helpers");
    };

    private makeHelper = (filename: string, templateFile: string): void =>{
        // Checking if filename argument has ".ts" file extension and adding it.
        const _fileName: string = (filename.substr(filename.length-3) === "."+Config.lang) ? filename : filename+"."+Config.lang;
        const callerName: string = (templateFile === "class.ejs")? capitalize(_fileName.slice(0, -3)) : _fileName.slice(0, -3);

        // Displaying loading information.
        dash.message("Generating template file...");

        // Creating template File
        Generator.generateFile(Config.getTemplatesDir("helpers/"+templateFile), {callerName}, Config.getHelpersDir(capitalize(_fileName)));

        const msg: IMessageObject = {relPath:_fileName, absPath:Config.getTemplatesDir(_fileName), className:filename, type: "Template"};
        Echo.success(Messages.FILE_GENERATED_MESSAGE(msg));
    };
}
