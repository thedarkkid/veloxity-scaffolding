import Fs from "fs";
import Path from "path";
import Fse from "fs-extra";
import Messages from "./Messages";

export const makeFile = (path:string, name:string, data?: string): boolean => {
    const _path = (name === "")? path : path+"/"+name;

    if(data) Fse.writeFileSync(_path, data);
    else Fse.writeFileSync(_path, '');

    return true;
};

export const makeDir = (path:string):boolean =>  {
    if(Fs.existsSync(path)) return false;
    Fs.mkdirSync(path);
    return true;
};

export const dirExists = (path: string):boolean =>{
    return Fs.existsSync(path);
};

export const fileExists = (path:string, name:string):boolean => {
    return Fs.existsSync(path+name);
};

export const projectBaseDir = (path?: string):string => {
    return Path.join(process.cwd(), path);
};

export const getDirFiles = (path:string):string[] => {
    if(!dirExists(path)) return [];

    const dirFiles: string[] = [];
    Fs.readdirSync(path).forEach(file => {dirFiles.push(file);});

    return dirFiles;
};

export const getDirModules = (path:string): string[] => {
    if(!dirExists(path)) throw Error(Messages.PATH_NONEXISTENT_ERROR(path));

    const dirModules: string[] = [];
    Fs.readdirSync(path).forEach(file => {
        if(!Fse.lstatSync(path+"\\"+file).isDirectory()) dirModules.push(file.slice(0, -3));
    });

    return dirModules;
};

export const getDirs = (path:string): string[] => {
    if(!dirExists(path)) throw Error(Messages.PATH_NONEXISTENT_ERROR(path));

    const dirModules: string[] = [];
    Fs.readdirSync(path).forEach(file => {
        if(Fse.lstatSync(path+"\\"+file).isDirectory()) dirModules.push(file);
    });

    return dirModules;
};

export const getFileContents = (filePath: string): string => {
    return Fse.readFileSync(filePath, 'utf-8');
};

export const  writeToFile = (content: string, filePath: string): boolean => {
    if (dirExists(filePath)) throw Error(Messages.FILE_NONEXISTENT_ERROR(filePath));
    Fse.writeFileSync(filePath, content);
    return true;
};

export default {
    makeFile,
    makeDir,
    dirExists,
    fileExists,
    projectBaseDir,
    getDirFiles,
    getDirModules,
    getDirs,
    getFileContents,
    writeToFile
};