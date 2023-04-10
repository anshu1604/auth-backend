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

      const fetchUserData = await User.findOne({ email });

      await User.updateOne({ email }, {
        $set: {
          first_name: firstName,
          last_name: lastName,
          mobile,
          country,
          dob,
          gender,
          status: constants.REGISTRATION_DONE
        }
      });

      if(fetchUserData.status != constants.REGISTRATION_DONE){
        return sendResponse(this.response, 'Details saved successfully!');
      }

      return sendResponse(this.response, 'Details updated successfully!');

    } catch (err) {
      console.log(err)
      return sendServerError(this.response, 'Internal Server Error');
    }
  }
}

export default AuthService;
