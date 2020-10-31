import {UserController} from "_http_/controllers";
import {APIUserAuthController} from '_http_/controllers/auth'
import express from "express";

const router = express.Router();

// ROUTES
/* User Auth Routes*/
router.post("/auth/users/register", APIUserAuthController.register);
router.post("/auth/users/login", APIUserAuthController.login);
router.post("/auth/users/password/forgot",  APIUserAuthController.getPasswordResetLink);
router.post("/auth/users/password/reset/:token", APIUserAuthController.resetPassword);

/*User Routes*/
router.get("/users", UserController.index);
router.post("/users", UserController.store);
router.put("/users/:id", UserController.update);
router.get("/users/:id", UserController.show);
router.delete("/users/:id", UserController.destroy);

export default router;