import { constants } from "../../constants.js";
import Otp from "../../db/models/Otp.js";
import User from "../../db/models/User.js";
import { sendErrorResponse, sendResponse, sendServerError } from "../../utils/handleResponse.js";
import jwt from "jsonwebtoken";

class OtpService {

    constructor(req, res) {
        this.request = req;
        this.response = res;
    }

    async send() {
        try {
            const { email } = this.request.body;
            const currentDate = new Date();
            const otpEntry = await Otp.findOne({ email });
            let updated_on = otpEntry?.updated_on;
            let sendOtpCount = otpEntry?.send_otp_count;
            const unlockTime = updated_on?.setMinutes(updated_on?.getMinutes() + constants.ACCOUNT_UNLOCK_MINUTE);

            if (currentDate > unlockTime && sendOtpCount == constants.MAX_SEND_OTP_COUNT) {
                await Otp.updateOne({email}, {
                    $set: {
                        send_otp_count: 0,
                        updated_on: new Date()
                    }
                });
                sendOtpCount = 0;
            }

            if (sendOtpCount == constants.MAX_SEND_OTP_COUNT) {
                await Otp.updateOne({ email }, {
                    $set: {
                        updated_on: new Date()
                    }
                });
                return sendErrorResponse(this.response, 'Your account has been locked, please try after sometime!');
            }
            await Otp.updateOne({ email }, {
                $set: {
                    email,
                    otp: 1234,
                    is_otp_expired: false,
                    updated_on: new Date()
                },
                $inc: {
                    send_otp_count: 1
                }
            }, { upsert: true });
            return sendResponse(this.response, 'OTP Sent!');
        }
        catch (err) {
            console.log(err);
            return sendServerError(this.response, 'Internal Server Error');
        }
    }

    async verify() {
        try {
            const { email, otp } = this.request.body;
            const currentDate = new Date();
            const otpDetails = await Otp.findOne({ email });
            const { updated_on, is_otp_expired } = otpDetails;

            const otpExpirationTime = updated_on.setMinutes(updated_on.getMinutes() + constants.OTP_EXPIRATION_MINUTE);

            if (currentDate > otpExpirationTime || is_otp_expired) {
                return sendErrorResponse(this.response, 'OTP Expired, Please try again!');
            }

            if (!otpDetails) {
                return sendErrorResponse(this.response, 'Email not found!');
            }

            if (otp === otpDetails?.otp) {
                await Otp.findOneAndUpdate({ email }, { is_otp_expired: true, updated_on: new Date() });
                const userDetails = await User.findOne({ email });
                let jwtPayload, userResponse;
                if (!userDetails) {

                    const payload = new User({
                        user_id: "sso" + new Date().getTime(),
                        email,
                        status: constants.USER_DETAIL_PENDING,
                    });

                    const { user_id, status } = payload;

                    jwtPayload = {
                        email,
                        user_id,
                        status
                    };
                    payload.token = jwt.sign(jwtPayload, "13042021");

                    await payload.save();

                    userResponse = {
                        email,
                        status,
                        accessToken: payload.token
                    };
                } else {
                    const { user_id, status } = userDetails;
                    jwtPayload = {
                        email,
                        user_id,
                        status
                    };
                    userResponse = {
                        email,
                        status,
                        accessToken: jwt.sign(jwtPayload, "13042021")
                    }
                    await User.findOneAndUpdate({ email }, { token: userResponse.accessToken });
                }
                return sendResponse(this.response, 'OTP matched!', userResponse);
            } else {
                return sendErrorResponse(this.response, 'Invalid OTP');
            }
        } catch (err) {
            console.log(err)
            return sendServerError(this.response, 'Internal Server Error');
        }
    }

    generateUserID() {

    }
}

export default OtpService;
