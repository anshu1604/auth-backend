import User from "../../db/models/User.js";
import { sendErrorResponse, sendResponse, sendServerError } from "../../utils/handleResponse.js";
import { constants } from "../../constants.js";

class AuthService {
  constructor(req, res) {
    this.request = req;
    this.response = res;
  }

  async save() {
    try {
      const { firstName, lastName, email, mobile, country, dob, gender } = this.request.body;
      const isEmailExist = await User.findOne({ email });
      if(isEmailExist) {
        return sendErrorResponse(this.response, 'Email already registered!');
      }
      else {
        const userDetails = new User({
          first_name: firstName,
          last_name: lastName,
          email,
          mobile,
          country,
          dob,
          gender,
          status: constants.REGISTRATION_PENDING
        });

        await userDetails.save();

        return sendResponse(this.response, 'User registered successfully!');
      }
    } catch (err) {
      return sendServerError(this.response, 'Internal Server Error');
    }
  }
}

export default AuthService;
