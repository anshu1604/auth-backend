import { body } from "express-validator"

class Validations {

    static sendOtpValidation() {
        return [
            body("email", "Please enter a valid email").isEmail()
        ];
    }

    static verifyOtpValidation() {
        const validations = this.sendOtpValidation();
        validations.push(body("otp", "Please enter a valid OTP").notEmpty().isLength({ min: 4, max: 4 }).withMessage("OTP can be of 4 digits only").isNumeric().withMessage("OTP can be numeric only"));
        return validations;
    }

    static registerValidation() {
        return [
            body("firstName", "Please enter a valid first name").notEmpty(),
            body("lastName", "please enter a valid last name").notEmpty(),
            body("email", "please enter a valid email").isEmail()
        ]
    }
}

export default Validations;