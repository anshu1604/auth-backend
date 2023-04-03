import { body } from "express-validator"

class Validations {

    static sendOtpValidation(){
        return [
            body("email", "Please enter a valida email").isEmail()
        ];
    }

    static registerValidation(){
        return [
            body("firstName", "Please enter a valid first name").notEmpty(),
            body("lastName", "please enter a valid last name").notEmpty(),
            body("email", "please enter a valid email").isEmail()
        ]
    }
}

export default Validations;