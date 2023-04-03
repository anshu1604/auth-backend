import { validationResult } from "express-validator";
import { sendErrorResponse } from "../../utils/handleResponse.js";
import OtpService from "../services/OtpService.js";

class OtpController {

    static send(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
            const errArr = errors.array();
            errArr.map((item) => (item.msg = item.msg));
            return sendErrorResponse(res, "OTP not sent!", errArr);
        }
        new OtpService(req, res).send();
    } catch (err) {
        console.log(err);
        }
    }
}

export default OtpController;
