import {Request, Response} from "express";

type RouterMethod = (req:Request, res:Response) => any;

interface IController {
    // Model:Model<any>;

    index: RouterMethod;
    show: RouterMethod;
    store: RouterMethod;
    update: RouterMethod;
    destroy: RouterMethod;
}

export default IController;