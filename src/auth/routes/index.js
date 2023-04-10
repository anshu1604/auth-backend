import express from "express";
import Validations from "../../utils/Validations.js";
import AuthController from "../controllers/AuthController.js";
import { verifyToken } from "../../utils/verifyToken.js";

const authRouter = express.Router();

authRouter.put("/user", [Validations.registerValidation(), verifyToken], AuthController.save);

export default authRouter;
