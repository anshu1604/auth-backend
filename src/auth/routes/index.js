import express from "express";
import Validations from "../../utils/Validations.js";
import AuthController from "../controllers/AuthController.js";
import { verifyToken } from "../../utils/verifyToken.js";

const authRouter = express.Router();

// save & edit user details
authRouter.put("/user", [Validations.registerValidation(), verifyToken], AuthController.save);

// get user details
authRouter.get("/user", verifyToken, AuthController.get);

export default authRouter;
