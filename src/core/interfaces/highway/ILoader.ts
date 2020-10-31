export default interface ILoader{
    generateLoaderFile: (importPathSuffix: boolean) => string|void;
}