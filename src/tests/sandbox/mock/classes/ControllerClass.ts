import {Controller} from "helpers/Decorators";

@Controller()
class ControllerClass{
    private static _instance: ControllerClass;

    testReqRes = async (req: any, res: any) => {
        throw Error("testReqRes test error");
    };

    testNoReqRes = async () => {throw Error("testNoReqRes test error");};

    public static get Instance()
    {
        return this._instance || (this._instance = new this());
    }

}
export default ControllerClass.Instance;