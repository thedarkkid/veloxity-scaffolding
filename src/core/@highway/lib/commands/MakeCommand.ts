import ICommand from "core/interfaces/highway/ICommand";
import Config from "helpers/Config";
import Echo from "helpers/Echo";
import Files from "helpers/Files";
import Messages from "helpers/Messages";
import ILooseObject from "core/interfaces/ILooseObject";
import Generator from "helpers/Generator";
import {dash} from "../Handler";
import IMessageObject from "core/interfaces/highway/IMessageObject";

export default class MakeCommand implements ICommand {
    commandString: string =  "make:command";
    templatePath: string = Config.getTemplatesDir("command.ejs");
    public flags: ILooseObject = {}; // all flags to be used in your doCommand will dynamically be added to this property.
    doCommand = (filename: string): void => {

        // Check if template path exists.
        if(!Files.dirExists(this.templatePath)) throw Error(Messages.FILE_NONEXISTENT_ERROR());

        // Display loading information
        dash.message("Generating command file config from filename...");

        // RegEXP to split camelcase.
        const regExp:RegExp = /(?<=[a-z])(?=[A-Z])|(?<=[A-Z])(?=[A-Z][a-z])|(?<=[0-9])(?=[A-Z][a-z])|(?<=[a-zA-Z])(?=[0-9])/;

        // Check if filename has ".ts" and remove it.
        if(filename.substr(filename.length-3) === "."+Config.lang) filename = filename.slice(0, -3);

        // Create an array from given filename.
        const splitFileName: string[] = filename.replace(regExp, " ").split(" ");
        splitFileName[0] = splitFileName[0].toLowerCase();
        splitFileName[1] = splitFileName.splice(1).join().toLowerCase();

        // Display loading information
        dash.message("Generating command data for template...");

        //  Create data for use in ejs template.
        const commandString : string = splitFileName[0]+":"+splitFileName[1];
        const echoString: string = splitFileName[0]+" "+splitFileName[1];
        const templatePathString: string = splitFileName[1]+".ejs";

        // Create the data object.
        const data: ILooseObject = {className: filename, commandString, templatePathString, echoString};

        // Display loading information
        dash.message("Generating command file...");

        // Generate file.
        const _fileName: string = filename+"."+Config.lang;
        const _commandFilePath: string = Config.getCommandsDir(_fileName);
        const generatedFilePath:string = Generator.generateFile(this.templatePath, data, _commandFilePath);

        // Create message OBJ
        const msgObj: IMessageObject = {relPath:_fileName, className:filename, type:"Command", absPath:generatedFilePath};

        Echo.success(Messages.FILE_GENERATED_MESSAGE(msgObj));
    };
}