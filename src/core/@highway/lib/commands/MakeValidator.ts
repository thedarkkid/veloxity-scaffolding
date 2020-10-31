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
import Files from "helpers/Files";
import LoaderLoad from "./LoaderLoad";

export default class MakeValidator implements ICommand {
    public commandString: string = "make:validator";
    templatePath: string = Config.getTemplatesDir("validator.ejs"); // run "node highway make:template validator.ejs" to generateCode template file.
    public flags: ILooseObject = {module: false}; // all flags to be used in your doCommand will dynamically be added to this property.  Include your default flag values there for intellisense purposes.
    public doCommand = (fname: string):void => {
        if(this.flags.module) {
            // Create validator module.
            this.makeValidatorModule(fname);

            // Generate loader index file.
            const loadCommand = new LoaderLoad();
            loadCommand.doCommand("validators");
        }
        else this.makeValidator(fname);
    };

    private makeValidator = (filename: string, folderName?: string): void => {
        dash.message("Computing config options...");

        // Creating config options
        const fnWithoutLang: string = (filename.substr(filename.length-3) === "."+Config.lang) ? filename.slice(0, -3) : filename;
        const className: string = capitalize(fnWithoutLang);
        const lclass: string = lowerlize(fnWithoutLang);

        // Getting template path and creating template file.
        const _filePath: string = (folderName) ? folderName+"\\"+className+"."+Config.lang : className+"."+Config.lang;
        const absFilePath = Config.getValidatorsDir(_filePath);
        Generator.generateFile(this.templatePath, {className, lclass}, absFilePath);

        // Generate error messages.
        const msg: IMessageObject = {relPath:_filePath, absPath:absFilePath, className, type: "Validator"};
        Echo.success(Messages.FILE_GENERATED_MESSAGE(msg));
    };

    private makeValidatorModule = (foldername: string): void => {
        dash.message("Computing config options for module...");

        // Creating config options in case the user decides to lick the teacup.
        const fnWithoutLang: string = (foldername.substr(foldername.length-3) === "."+Config.lang) ? foldername.slice(0, -3) : foldername;
        const moduleFolder = capitalize(fnWithoutLang);
        const absPath = Config.getValidatorsDir(moduleFolder);

        // Create folder.
        Files.makeDir(absPath);

        dash.message("Generating module files...");

        // Create validator files.
        this.makeValidator("store", moduleFolder);
        this.makeValidator("update", moduleFolder);

        const msg: IMessageObject = {relPath:moduleFolder, absPath, className:moduleFolder, type: "Validator"};
        Echo.success(Messages.MODULE_GENERATED_MESSAGE(msg));
    };
}
