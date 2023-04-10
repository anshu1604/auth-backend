import express from "express";
import Validations from "../../utils/Validations.js";
import AuthController from "../controllers/AuthController.js";

const authRouter = express.Router();

authRouter.put("/auth", Validations.registerValidation(), AuthController.save);

export default authRouter;
