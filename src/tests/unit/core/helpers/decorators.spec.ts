import {Controller} from "core/helpers/Decorators";
// @ts-ignore
import ControllerClass from "sandbox/mock/classes/ControllerClass";
import {ResponseHelper} from "_helpers_";
import SpyInstance = jest.SpyInstance;

test("Controller decorator is defined", () => {
   expect(Controller).toBeDefined();
});

test("Controller decorator keeps class properties", () => {
   expect(ControllerClass).toHaveProperty("testNoReqRes");
});

test("Controller decorator wraps class in try/catch", async () => {
   await ControllerClass.testReqRes({}, {}).catch( (e: any) => {
      expect(e).toBeTruthy();
   });
});

test("Controller Decorator handles methods without the request/response params", async () => {
   const consoleSpy: SpyInstance = jest.spyOn(console, 'log');
   let returnedError: string = "";
   consoleSpy.mockImplementation((arg1) => returnedError = arg1 );
   const responseHelperErrorSpy: SpyInstance = jest.spyOn(ResponseHelper, "error");

   await ControllerClass.testNoReqRes();
   expect(consoleSpy).toHaveBeenCalled();
   expect(responseHelperErrorSpy).not.toHaveBeenCalled();
   expect(returnedError).toBe("Error: testNoReqRes test error");

   consoleSpy.mockRestore();
   responseHelperErrorSpy.mockRestore();
});

test("Controller Decorator handles methods with req/res params", async () => {
   const responseHelperErrorSpy: SpyInstance = jest.spyOn(ResponseHelper, "error");
   let returnedError: string = "";
   responseHelperErrorSpy.mockImplementation((arg1, arg2, arg3) => returnedError = arg2 );
   const consoleSpy: SpyInstance = jest.spyOn(console, 'log');

   await ControllerClass.testReqRes({}, {}).catch( (e: any) => {
      expect(responseHelperErrorSpy).toHaveBeenCalled();
      expect(returnedError).toBe("Error: testReqRes test error");
      expect(consoleSpy).not.toHaveBeenCalled();
   });

   consoleSpy.mockRestore();
   responseHelperErrorSpy.mockRestore();
});
