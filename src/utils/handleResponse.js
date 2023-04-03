// import { t } from "../config/i18.config";

/**
 *
 * @param res - response payload that is sent back to the router
 * @param message - message regarding the api action ( whether it got failed or successfully executed )
 * @param data - data requested from the api
 * @param pagination - if there is any list of items then pagination will be managed via this
 * @param statusCode - implies the status code of the api
 * @returns {object}
 * @description - format the api response if api succeed
 */
export const sendResponse = (
  res,
  message = "",
  data = {},
  pagination = null,
  statusCode = 200
) => {
  const response = {
    success: true,
    message: message,
  };
  Object.keys(data).length > 0 ? (response.data = data) : null;
  pagination ? (response.pagination = pagination) : null;
  return res.status(statusCode).json(response);
};

/**
 *
 * @param res - response payload that is sent back to the router
 * @param message - message regarding the api action ( whether it got failed or successfully executed )
 * @param errors - errors that occurred during the api execution
 * @param statusCode - implies the status code of the api
 * @returns {object}
 * @description - format the api error response
 */
export const sendErrorResponse = (
  res,
  message = "",
  errors = [],
  statusCode = 400
) => {
  const response = {
    success: false,
    message,
  };
  !message ? (response.message = "something_went_wrong") : null;
  errors.length > 0 ? (response.errors = errors) : null;
  return res.status(statusCode).json(response);
};

export const sendServerError = (
  res,
  message = "",
  errors = [],
  statusCode = 500
) => {
  const response = {
    success: false,
    message,
    errors: { msg: "internal_server_error" },
  };
  !message ? (response.message = "something_went_wrong") : null;
  errors.length > 0 ? (response.errors = errors) : null;
  return res.status(statusCode).json(response);
};
