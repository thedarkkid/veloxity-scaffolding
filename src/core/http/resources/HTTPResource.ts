import DataTransferObject from "core/http/resources/DataTransferObject";
import ILooseObject from "core/interfaces/ILooseObject";

export default class HTTPResource<T> extends DataTransferObject<T>{

    private _with:any;
    constructor() {
        super();
    }

    readonly _collection = (collection: T[]): ILooseObject[] | ILooseObject => {
        return {data: this.collection(collection), meta: this.with};
    };

    readonly _single = (object: T): ILooseObject => {
        return {data: this.single(object), meta: this.with}
    };

    protected transformObject = (object: T): ILooseObject =>{
        return this.transformObject(object)
    };

    protected get with(){
        return this._with;
    }

    protected set with (content: any){
        this._with = content;
    }

    _append = (content: any): HTTPResource<T> => {
        this.append(content);
        return this;
    }

}