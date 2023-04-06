import { constants } from "../../constants.js";
import Otp from "../../db/models/Otp.js";
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
            await Otp.updateOne({ email }, {
                $set: {
                    email,
                    otp: 1234,
                    isOtpExpired: false,
                    updated_on: new Date()
                }
            }, { upsert: true });
            return sendResponse(this.response, 'OTP Sent!', { email });
        }
        catch (err) {
            return sendServerError(this.response, 'Internal Server Error');
        }
    }

    async verify() {
        try {
            const { email, otp } = this.request.body;
            const currentDate = new Date();
            const otpDetails = await Otp.findOne({ email });
            const { updated_on, isOtpExpired } = otpDetails;

            const otpExpirationTime = updated_on.setMinutes(updated_on.getMinutes() + 2);

            if (currentDate > otpExpirationTime || isOtpExpired) {
                return sendErrorResponse(this.response, 'OTP Expired, Please try again!');
            }

            if (!otpDetails) {
                return sendErrorResponse(this.response, 'Email not found!');
            }

            if (otp === otpDetails?.otp) {
                await Otp.findOneAndUpdate({ email }, { isOtpExpired: true, updated_on: new Date() });
                const isUserAlreadyExist = await User.findOne({ email });
                if(!isUserAlreadyExist){
                    const payload = new User({
                        email,
                        status: constants.REGISTRATION_PENDING
                    });
                    await payload.save();
                }
                return sendResponse(this.response, 'OTP matched!');
            } else {
                return sendErrorResponse(this.response, 'Invalid OTP');
            }
        } catch (err) {
            console.log(err);
            return sendServerError(this.response, 'Internal Server Error');
        }
    }
}

export default OtpService;
