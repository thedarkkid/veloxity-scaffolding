export default interface IModuleLoader{
    moduleFolder: string;
    loaderPath: string;
    suffix?: string;
    importPath: string
}