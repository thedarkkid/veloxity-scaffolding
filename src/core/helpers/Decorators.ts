// tslint:disable:ban-templates
// tslint:disable:no-empty
// tslint:disable:no-console

import {ResponseHelper} from "_helpers_";
import {getParamNames, log} from "core/helpers/Utility";
import express from "express";

export function Controller(){
    return <TFunction extends Function>(target: TFunction) => {
        // @ts-ignore
        for(const prop of Object.getOwnPropertyNames(target.Instance)){
            // @ts-ignore
            // Save the original function
            const oldFunc: Function = target.Instance[prop];
            // Get parameter names of the function.
            const paramNames: string[] = getParamNames(oldFunc);
            if(oldFunc instanceof Function && (paramNames.includes("res") || paramNames.includes("response"))) {
                const resName: string = (paramNames.includes("res"))? "res" : "response";
                // @ts-ignore
                target.Instance[prop] = async (req:express.Request, res:express.Response) => {
                    try {
                        return await oldFunc(req, res);
                    }catch (e) {
                        return ResponseHelper.error(res, e);
                    }
                }
            }
        }
    }
}

export function Async() {
    return (target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<(... params: any[])=> Promise<any>>) => {
        const oldFunc: Function = descriptor.value;
        const paramNames: string[] = getParamNames(oldFunc);
        if((paramNames.includes("res") || paramNames.includes("response"))) {
            descriptor.value = async (req:express.Request, res:express.Response) => {
                try{
                    return await oldFunc.apply(this, arguments);
                }catch (e) {
                    ResponseHelper.error(res, e);
                }
            }
        }else{
            descriptor.value = async () => {
                try{
                    return await oldFunc.apply(this, arguments);
                }catch (e) {
                    log(e);
                    ResponseHelper.console(e);
                }
            }
        }
    }
}

export default {Controller, Async};