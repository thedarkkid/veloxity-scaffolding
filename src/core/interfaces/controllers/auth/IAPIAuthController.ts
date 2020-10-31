import express from "express";

interface IAPIAuthController {
  register(req:express.Request, res:express.Response):Promise<any>;
  login(req:express.Request, res:express.Response):Promise<any>;
}

export default IAPIAuthController;