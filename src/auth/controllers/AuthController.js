import { validationResult } from "express-validator";
import { sendErrorResponse } from "../../utils/handleResponse.js";
import AuthService from "../services/AuthService.js";

class AuthController {

  static save(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const errArr = errors.array();
        errArr.map((item) => (item.msg = item.msg));
        return sendErrorResponse(res, "User is not registered", errArr);
      }
      new AuthService(req, res).save();
    } catch (err) {
      console.log(err);
    }
  }

  static get(req, res) {
    try {
      new AuthService(req, res).get();
    } catch (err) {
      console.log(err);
    }
  }

  static logout(req, res) {
    try {
      new AuthService(req, res).logout();
    } catch(err) {
      console.log(err);
    }
  }
}

export default AuthController;
