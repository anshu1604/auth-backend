import User from "../db/models/User.js";
import { sendErrorResponse, sendServerError } from "./handleResponse.js";
import jwt from "jsonwebtoken";

export const verifyToken = async(req, res, next) => {
    try {

        const token = req.header("token");

        if(!token){
            return sendErrorResponse(res, 'Please authenticate using a valid token!', [], 401);
        }

        const isUserExist = await User.findOne({ token });

        if(!isUserExist){
            return sendErrorResponse(res, 'Invalid User', [], 401);
        }

        const { email, user_id, status } = jwt.verify(token, "13042021");

        const data = {
            email,
            user_id,
            status
        };

        req.user = data;
        next();

    } catch(err) {
        console.log(err);
        return sendServerError(res, 'Internal Server Error');
    }
}