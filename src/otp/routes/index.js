import express from "express";
import Validations from "../../utils/Validations.js";
import OtpController from "../controllers/OtpController.js";

const otpRouter = express.Router();

otpRouter.post("/otp/send", Validations.sendOtpValidation(), OtpController.send);

export default otpRouter;
