// Command File generated with Highway-CLI.

import ICommand from "core/interfaces/highway/ICommand";
import Echo from "helpers/Echo";
import Config from "helpers/Config";
import {dash} from "../Handler";
import Messages from "helpers/Messages";
import IMessageObject from "core/interfaces/highway/IMessageObject";
import {capitalize} from "helpers/Utility";
import Generator from "helpers/Generator";
import ILooseObject from "core/interfaces/ILooseObject";
import LoaderLoad from "./LoaderLoad";

export default class MakeModel implements ICommand {
    public commandString: string = "make:model";
    templatePath: string = Config.getTemplatesDir("model.ejs"); // run "node highway make:template model.ejs" to generateCode template file.
    public flags: ILooseObject = {interface: false, full: false}; // all flags to be used in your doCommand will dynamically be added to this property.
    public doCommand = (filename: string):void => {
        if(this.flags.full){
            this.makeModelInterface(filename);
            this.makeModel(filename);
        } else if(this.flags.interface) this.makeModelInterface(filename);
        else this.makeModel(filename);
    };

    private makeModel = (filename: string): void => {
        dash.message("Computing config options...");

        // Creating config options
        const fnWithoutLang: string = (filename.substr(filename.length-3) === "."+Config.lang) ? filename.slice(0, -3) : filename;
        const baseName: string = (fnWithoutLang.substr(fnWithoutLang.length-5).toLowerCase() === "model")? fnWithoutLang.slice(0, -5) : fnWithoutLang;

        const modelName: string = capitalize(baseName);
        const modelInterface: string = "I"+modelName+"Model";
        const fileName: string = modelName+"."+Config.lang;

        dash.message("Generating model...");

        // Creating template File
        Generator.generateFile(this.templatePath, {modelName, modelInterface}, Config.getModelsDir(fileName));

        const msg: IMessageObject = {relPath:fileName, absPath:Config.getModelisDir(fileName), className: modelName, type: "Model"};
        Echo.success(Messages.FILE_GENERATED_MESSAGE(msg));

        // Generate loader index file.
        const loadCommand = new LoaderLoad();
        loadCommand.doCommand("models");
    };

    private makeModelInterface = (filename: string): void =>{
        dash.message("Computing config options...");

        // Creating config options
        const modeliName: string = (filename.substr(filename.length-3) === "."+Config.lang) ? filename.slice(0, -3) : filename;
        const _fileName: string = "I"+modeliName+"Model"+"."+Config.lang;

        dash.message("Generating model interface...");

        // Creating template File
        Generator.generateFile(Config.getTemplatesDir("modeli.ejs"), {modeliName}, Config.getModelisDir(_fileName));

        const msg: IMessageObject = {relPath:_fileName, absPath:Config.getModelisDir(_fileName), className:modeliName, type: "Model interface"};
        Echo.success(Messages.FILE_GENERATED_MESSAGE(msg));
    };
}
