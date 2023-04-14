import express from "express";
import Validations from "../../utils/Validations.js";
import OtpController from "../controllers/OtpController.js";

const otpRouter = express.Router();

// send otp route
otpRouter.post("/otp/send", OtpController.send);

// verify otp route
otpRouter.put("/otp/verify", Validations.verifyOtpValidation(), OtpController.verify);

export default otpRouter;
