import Otp from "../../db/models/Otp.js";
import { sendErrorResponse, sendResponse, sendServerError } from "../../utils/handleResponse.js";

class OtpService {

    constructor(req, res) {
        this.request = req;
        this.response = res;
    }

    async send() {
        try {
            const { email } = this.request.body;
            await Otp.updateOne({ email }, {
                $set: {
                    email,
                    otp: 1234
                }
            }, { upsert: true }).then((res) => {
                console.log(res);
            }).catch(err => {
                console.log(err);
            })
            return sendResponse(this.response, 'OTP Sent!', { email });
        }
        catch (err) {
            return sendServerError(this.response, 'Internal Server Error');
        }
    }

    async verify() {
        try {
            const { email, otp } = this.request.body;
            const otpDetails = await Otp.findOne({email});
            if(!otpDetails){
                return sendErrorResponse(this.response, 'Email not found!');
            }
            if(otp === otpDetails?.otp){
                return sendResponse(this.response, 'OTP matched!');
            } else {
                return sendErrorResponse(this.response, 'Invalid OTP');
            }
        } catch (err) {
            return sendServerError(this.response, 'Internal Server Error');
        }
    }
}

export default OtpService;
