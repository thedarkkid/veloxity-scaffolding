import ILooseObject from "core/interfaces/ILooseObject";

export default abstract class IDataTransferObject<T>{
    protected collection: (collection: T[]) => ILooseObject[];
    protected single: (object: T) => ILooseObject;
    protected transformObject: (object: T) => ILooseObject;
}