// Class helper file generated with Highway-CLI.
import Os from "os";
import ILooseObject from "core/interfaces/ILooseObject";
import Files from "helpers/Files";

export default class Config{
    static sanitaryOptions = {
        errors: {
            wrap: {
                label: '('
            }
        },
        convert: true
    };

    private static defaults: ILooseObject = {
        lang: "ts",
        templatesDir: Files.projectBaseDir("/src/core/@highway/templates"),
        commandsDir: Files.projectBaseDir("/src/core/@highway/lib/commands"),
        controllersDir: Files.projectBaseDir("/src/http/controllers"),
        modelisDir: Files.projectBaseDir("/src/core/interfaces/models"),
        modelsDir: Files.projectBaseDir("/src/models"),
        helpersDir: Files.projectBaseDir("/src/core/helpers"),
        validatorsDir: Files.projectBaseDir("/src/http/validators"),
        middlewareDir: Files.projectBaseDir("/src/http/middleware"),
        resourcesDir: Files.projectBaseDir("/src/http/resources")
    };

    static readonly lang:string = Config.defaults.lang;
    static readonly templatesDir: string = Config.defaults.templatesDir;
    static readonly commandsDir: string = Config.defaults.commandsDir;
    static readonly controllersDir: string = Config.defaults.controllersDir;
    static readonly modelisDir: string = Config.defaults.modelisDir;
    static readonly modelsDir: string = Config.defaults.modelsDir;
    static readonly helpersDir: string = Config.defaults.helpersDir;
    static readonly validatorsDir: string = Config.defaults.validatorsDir;
    static readonly middlewareDir: string = Config.defaults.middlewareDir;
    static readonly resourcesDir: string = Config.defaults.resourcesDir;

    static readonly passwordResetURI: string = "/password/reset";
    static readonly churchAuthURI: string = "/auth/churches";
    static readonly userAuthURI: string = "/auth/users";

    static get baseURI(){
        return (process.env.BASE_URI) ? process.env.BASE_URI : 'http://'+Os.hostname();
    }

    static userPasswordResetURI = (token: string):  string =>{
        return Config.baseURI+Config.userAuthURI+Config.passwordResetURI+"/"+token;
    };

    static churchPasswordResetURI = (token: string):  string =>{
        return Config.baseURI+Config.churchAuthURI+Config.passwordResetURI+"/"+token;
    };

    static getTemplatesDir = (file?: string) :string => {
        if(!file) return Config.templatesDir;
        return Config.templatesDir+"\\"+file;
    };

    static getCommandsDir = (file?: string) :string => {
        if(!file) return Config.commandsDir;
        return Config.commandsDir+"\\"+file;
    };

    static getControllersDir = (file?: string) :string => {
        if(!file) return Config.controllersDir;
        return Config.controllersDir+"\\"+file;
    };

    static getModelisDir = (file?: string) :string => {
        if(!file) return Config.modelisDir;
        return Config.modelisDir+"\\"+file;
    };

    static getModelsDir = (file?: string) :string => {
        if(!file) return Config.modelsDir;
        return Config.modelsDir+"\\"+file;
    };

    static getHelpersDir = (file?: string) :string => {
        if(!file) return Config.helpersDir;
        return Config.helpersDir+"\\"+file;
    };

    static getValidatorsDir = (file?: string) :string => {
        if(!file) return Config.validatorsDir;
        return Config.validatorsDir+"\\"+file;
    };

    static getMiddlewareDir = (file?: string) :string => {
        if(!file) return Config.middlewareDir;
        return Config.middlewareDir+"\\"+file;
    };

    static getResourcesDir = (file?: string) :string => {
        if(!file) return Config.resourcesDir;
        return Config.resourcesDir+"\\"+file;
    };
}

