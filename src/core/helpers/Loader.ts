// tslint:disable:prefer-for-of

import ILoader from "../interfaces/highway/ILoader";
import Files from "helpers/Files";
import IModuleLoader from "../interfaces/highway/IModuleLoader";
import Config from "helpers/Config";
import ILooseObject from "../interfaces/highway/ILooseObject";
import Generator from "helpers/Generator";
import {capitalize} from "helpers/Utility";

export default class Loader implements ILoader{
    private readonly moduleFolder: string;
    private readonly loaderPath: string;
    private readonly suffix: string;
    private readonly importPath: string;

    constructor(moduleLoader: IModuleLoader) {
        this.moduleFolder = moduleLoader.moduleFolder;
        this.loaderPath = moduleLoader.loaderPath;
        this.importPath = moduleLoader.importPath;
        this.suffix = (moduleLoader.suffix)? moduleLoader.suffix : "";
    }

    generateLoaderFile = (importPathSuffix?: boolean): (string | void) => {
        importPathSuffix = (importPathSuffix)? importPathSuffix : false;
        let mFolderArr: string[] = Files.getDirModules(this.moduleFolder);

        if(mFolderArr.length <=0) return ;
        mFolderArr = this.generateModuleArr(mFolderArr);

        const data: ILooseObject = {suffix:this.suffix, moduleFiles:mFolderArr, importPath: this.importPath, capitalize, ipSuffix:importPathSuffix};
        return Generator.generateFile(Config.getTemplatesDir("loader.ejs"), data, this.loaderPath);
    };

    private generateModuleArr = (mFolderArr: string[]): string[] => {
        const suffix = this.suffix;
        const moduleArr: string[] = [];

        for(let i=0; i<mFolderArr.length; i++){
            // tslint:disable-next-line:prefer-const
            let mFolder = mFolderArr[i];

            const sliceBy = -1*suffix.length;
            if(this.suffix !== "" && mFolder.substr(mFolder.length+sliceBy).toLowerCase() === suffix.toLowerCase()) mFolder = mFolder.slice(0, sliceBy);
            moduleArr.push(mFolder);
        }

        return moduleArr;
    } ;
}