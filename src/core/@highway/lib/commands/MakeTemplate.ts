// Command File generated with Highway-CLI

import ICommand from "core/interfaces/highway/ICommand";
import Echo from "helpers/Echo";
import Config from "helpers/Config";
import {dash} from "../Handler";
import Generator from "helpers/Generator";
import IMessageObject from "core/interfaces/highway/IMessageObject";
import Messages from "helpers/Messages";
import {capitalize} from "helpers/Utility";
import ILooseObject from "core/interfaces/ILooseObject";

export default class MakeTemplate implements ICommand {
    public commandString: string = "make:template";
    templatePath: string = Config.getTemplatesDir("template.ejs");
    public flags: ILooseObject = {}; // all flags to be used in your doCommand will dynamically be added to this property.
    public doCommand = (filename: string):void => {
        // Checking if filename argument has ".ejs" file extension and adding it.
        const _fileName: string = (filename.substr(filename.length-4) === ".ejs") ? filename : filename+".ejs";
        const templateType: string = capitalize(_fileName.slice(0, -4));

        // Displaying loading information.
        dash.message("Generating template file...");

        // Creating template File
        Generator.generateFile(this.templatePath, {templateType}, Config.getTemplatesDir(_fileName));

        const msg: IMessageObject = {relPath:_fileName, absPath:Config.getTemplatesDir(_fileName), className:filename, type: "Template"};
        Echo.success(Messages.FILE_GENERATED_MESSAGE(msg));
    };
}
