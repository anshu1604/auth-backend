import User from "../../db/models/User.js";
import { sendErrorResponse, sendResponse, sendServerError } from "../../utils/handleResponse.js";

class OtpService {

    constructor(req, res) {
        this.request = req;
        this.response = res;
    }

    async send() {
        try {
            const { email } = this.request.body;
            const isEmailExist = await User.findOne({ email });
            console.log(isEmailExist);
            if(isEmailExist) {
                await User.findOneAndUpdate({ email }, { otp: 1234 }).then((res) => {
                    console.log(res);
                }).catch(err => {
                    console.log(err);
                })
                return sendResponse(this.response, 'OTP Sent!');
            }

            await userDetails.save();

            return sendResponse(this.response, 'User registered successfully!');
        }
    catch (err) {
            return sendServerError(this.response, 'Internal Server Error');
        }
    }
}

export default OtpService;
