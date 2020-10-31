// Command File generated with Highway-CLI.

import ICommand from "core/interfaces/highway/ICommand";
import Echo from "helpers/Echo";
import Config from "helpers/Config";
import ILooseObject from "core/interfaces/ILooseObject";
import {dash} from "../Handler";
import IModuleLoader from "core/interfaces/highway/IModuleLoader";
import Files from "helpers/Files";
import Loader from "helpers/Loader";
import {capitalize} from "helpers/Utility";
import Messages from "helpers/Messages";

export default class LoaderLoad implements ICommand {
    public commandString: string = "loader:loader";
    templatePath: string = Config.getTemplatesDir(".ejs"); // run "node highway make:template .ejs" to generateCode template file.
    public flags: ILooseObject = {module: "all"}; // all flags to be used in your doCommand will dynamically be added to this property. Include your default flag values there for intellisense purposes.

    private loaderConfigs: ILooseObject = {
        "controllers": {
            config: {
                importPath: "http/controllers/",
                loaderPath:"/src/core/@loaders/http/controllers/index.ts",
                moduleFolder: "/src/http/controllers",
                suffix: "controller"
            },
            importPathSuffix: true,
            modules: false
        },
        "resource": {
            config: {
                importPath: "http/resources/",
                loaderPath:"/src/core/@loaders/http/resources/index.ts",
                moduleFolder: "/src/http/resources",
                suffix: "resource"
            },
            importPathSuffix: true,
            modules: false
        },
        "models": {
            config:{
                importPath: "models/",
                loaderPath:"/src/core/@loaders/models/index.ts",
                moduleFolder: "/src/models",
                suffix: "model"
            },
            importPathSuffix: false,
            modules: false

        },
        "helpers": {
            config: {
                importPath: "helpers/",
                loaderPath:"/src/core/@loaders/helpers/index.ts",
                moduleFolder: "/src/core/helpers",
                suffix: "helper"
            },
            importPathSuffix: false,
            modules: false
        },
        "middleware": {
            config: {
                importPath: "http/middleware/",
                loaderPath:"/src/core/@loaders/http/middleware/index.ts",
                moduleFolder: "/src/http/middleware",
                suffix: "middleware"
            },
            importPathSuffix: false,
            modules: false
        },
        "validators": {
            config: {
                importPath: "http/validators/",
                loaderPath: "/src/core/@loaders/http/validators/",
                moduleFolder: "/src/http/validators/",
                suffix: "validator"
            },
            importPathSuffix: false,
            modules: true
        },
        "core_validators": {
            config: {
                importPath: "core/http/validators/",
                loaderPath: "/src/core/@loaders/http/validators/",
                moduleFolder: "/src/core/http/validators/",
                suffix: "validator"
            },
            importPathSuffix: false,
            modules: true
        },
        "core_controllers": {
            config: {
                importPath: "core/http/controllers/",
                loaderPath:"/src/core/@loaders/http/controllers/core.ts",
                moduleFolder: "/src/core/http/controllers",
                suffix: "controller"
            },
            importPathSuffix: true,
            modules: false
        },
    };

    public doCommand = (filename: string):void => {
        dash.message("Checking parameters and generating @loaders");
        if(filename === "all-") return this.loadAll();

        if(!this.loaderConfigs.hasOwnProperty(filename)) throw Error(Messages.MODULE_NONEXISTENT_ERROR(filename, Object.keys(this.loaderConfigs).toString()));
        if(filename === "validators") return this.loadCompoundModules();

        const loaderConfig: ILooseObject = this.loaderConfigs[filename];
        this.loadModule(loaderConfig);
    };

    private loadCompoundModules = (configName?: string): void => {
        configName = (configName) ? configName: "validators";
        const vLoaderConfig: ILooseObject = this.loaderConfigs[configName];
        const validators: string[] = Files.getDirs(Files.projectBaseDir(vLoaderConfig.config.moduleFolder));
        for(let i=0; i<validators.length; i++){
            this.loadModules(validators[i], vLoaderConfig);
        }
    };

    private loadModules = (fname: string, modConfig: ILooseObject): void =>{
        const fnWithoutLang: string = (fname.substr(fname.length-3) === "."+Config.lang) ? fname.slice(0, -3) : fname;
        const ModulePath = capitalize(fnWithoutLang);
        const loaderName: string = ModulePath+"."+Config.lang;

        const loaderConfig: IModuleLoader = {
            importPath: `${modConfig.config.importPath}${ModulePath}/`,
            loaderPath:Files.projectBaseDir(`${modConfig.config.loaderPath}${loaderName}`),
            moduleFolder: Files.projectBaseDir(`${modConfig.config.moduleFolder}${ModulePath}`),
            suffix: `${modConfig.config.suffix}`
        };

        const loader = new Loader(loaderConfig);
        const loaderPath = loader.generateLoaderFile();
        Echo.success(`${capitalize(loaderConfig.suffix)} module loader file generated successfully at ${loaderPath}`);
    };

    private loadModule = (loaderConfig: ILooseObject):void => {
        // Converting relative paths to absolute paths.
        loaderConfig.config.loaderPath = Files.projectBaseDir(loaderConfig.config.loaderPath);
        loaderConfig.config.moduleFolder = Files.projectBaseDir(loaderConfig.config.moduleFolder);

        // Generating loader file from loader config.
        const loader = new Loader(loaderConfig.config);
        const loaderPath = loader.generateLoaderFile(loaderConfig.importPathSuffix);

        Echo.success(`${capitalize(loaderConfig.config.suffix)} loader file generated successfully at ${loaderPath}`);
    };

    loadAll = (): void => {
        const configs: string[] = Object.keys(this.loaderConfigs);
        for(let i=0; i<configs.length; i++){
            const currentConfig = this.loaderConfigs[configs[i]];
            if(currentConfig.modules) this.loadCompoundModules(configs[i]);
            else this.loadModule(currentConfig);
        }
    }
}
