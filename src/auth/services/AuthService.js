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
          status: constants.USER_DETAIL_DONE
        }
      });

      if (fetchUserData.status != constants.USER_DETAIL_DONE) {
        return sendResponse(this.response, 'Details saved successfully!');
      }

      return sendResponse(this.response, 'Details updated successfully!');

    } catch (err) {
      console.log(err)
      return sendServerError(this.response, 'Internal Server Error');
    }
  }

  async get() {
    try {
      const { email } = this.request.user;

      const userDetails = await User.findOne({ email });

      const data = {
        userID: userDetails?.user_id,
        firstName: userDetails?.first_name || '',
        lastName: userDetails?.last_name || '',
        email: userDetails?.email,
        mobileNumber: userDetails?.mobile || '',
        status: userDetails?.status == constants.USER_DETAIL_PENDING ? constants?.USER_DETAIL_PENDING_TEXT : constants?.USER_DETAIL_DONE_TEXT,
        gender: userDetails?.gender || '',
        DOB: userDetails?.dob || '',
        country: userDetails?.country || ''
      }

      return sendResponse(this.response, 'User Details', data);
    } catch (err) {
      console.log(err);
      return sendServerError(this.response, 'Internal Server Error');
    }
  }

  async logout() {
    try {
      const { email } = this.request.user;

      await User.updateOne({ email }, {
        $set: {
          token: null
        }
      });

      return sendResponse(this.response, 'User Logged Out!');
    } catch (err) {
      console.log(err);
    }
  }
}

export default AuthService;
