import IDataTransferObject from "core/interfaces/resources/IDataTransferObject";
import ILooseObject from "core/interfaces/ILooseObject";

export default class DataTransferObject<Document> extends IDataTransferObject<Document>{
    private toAppend: ILooseObject = null;

    protected collection = (collection: Document[]): ILooseObject[] => {
        const newCollection: ILooseObject[] = [];
        for(let i=0; i<collection.length; i++) {
            let obj: ILooseObject = this.transformObject(collection[i]);
            if(this.toAppend !== null) obj = {obj, metadata: this.toAppend};
            newCollection.push(obj);
        }
        this.toAppend = null;
        return newCollection;
    };

    protected single = (object: Document): ILooseObject => {
        let obj:ILooseObject = this.transformObject(object);
        if(this.toAppend !== null){
            const append: ILooseObject = this.toAppend;
            obj = {obj, metadata: append};
            this.toAppend = null;
        }
        return obj;
    };

    protected transformObject = (object: Document): ILooseObject =>{
        return object;
    };

    protected append = (content: any): void => {
        this.toAppend = content;
    }
}