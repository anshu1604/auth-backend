import { body } from "express-validator"

class Validations {

    static sendOtpValidation() {
        return [
            body("email", "Email cannot be empty").notEmpty().isEmail().withMessage("Please enter a valid email")
        ];
    }

    static verifyOtpValidation() {
        const validations = this.sendOtpValidation();
        validations.push(body("otp", "OTP cannot be empty").notEmpty().isLength({ min: 4, max: 4 }).withMessage("OTP can be of 4 digits only").isNumeric().withMessage("OTP can be numeric only"));
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