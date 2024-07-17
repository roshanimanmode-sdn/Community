/**
 * Summary. Initializes the constants to be used in the application
 * Description. The file list all the contants used in the application
 * @Author: Roshni Manmode
 * @Created On: 10th July, 2024
 */

//messages
export const messages = {
  successFully: (data) => `${data} successfully`,
  unSuccessFully: (data) => `${data} unsuccessfully`,
  unAuthorized: "Unauthorized",
  valid: (data) => `${data} is valid`,
  inValid: (data) => `${data} is Invalid`,
  alreadyExist: (data) => `${data} already exist`,
  internalServerError: "Internal Server Error",
  dataNotFound: "No data found",
  errorMessage: "Something Went Wrong, Please Try Again.",
  NotFound: "User Not found!!.",
  userVerify: "User Verified Successfully",
  alreadyUserVerified: "User Already Verified.",
  WrongCredet: "Wrong Credential",
  unAuthorized: "Unauthorized",
  checkMail: "please check your email to change your password",
  addRecord: "Record added successfully.",
  loginSuccess: "Login successfully",
  listSuccess: "Data fetched successfully",
  deleteSuccess: "Data deleted successfully",
  updateSuccess: "Updated successfully",
  changePassword: "Password updated successfully!!.",
  passwordNotMatched: "Both passwords are not matched",
  passwordIncorrect: "Password is incorrect",
  inValidEmail: "Email is inValid",
  emailVerify: "Please verify your email",
  emailIncorrect: "Email is incorrect",
  emailExist: "Email already exist.",
  verificationLinkSend: "Email Verification link send, Please check your email",
  authError: "Auth Error",
  tokenExpire: "Token Expire",
  invalidToken: "Invalid Token",
  existAlready: "Already exist",
  refundSuccess: "Refund successfull",
  emailSent: "Email sent successfully"
};

export const responseStatus = {
  successStatus: true,
  failedStatus: false,
};

//responseCodes
export const responseCodes = {
  //to be used when no new record is inserted but to display success message
  successCode: 200,

  //to be used when new record is inserted
  newResourceCreated: 201,

  //to be used if database query return empty record
  nocontent: 204,

  //to be used if the request is bad e.g. if we pass record id which does not exits
  badRequest: 400,

  //jwtTokenExpired: 401,
  //to be used when the user is not authorized to access the API e.g. invalid access token
  unAuthorizedUser: 401,

  //to be used when access token is not valid
  forbidden: 403,

  //to be used if something went wrong
  failureCode: 404,

  //to be used when error occured while accessing the API
  internalServerError: 500,

  //to be used if record already axists
  conflictCode: 409,
};

export default  messages;