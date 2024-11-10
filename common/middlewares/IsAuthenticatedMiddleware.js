// This code chceks if the incoming request has a valid JWT in its authorisation header.
// It ensures that the header exists, follows the Bearer <token> format, and contains a valid token.
//If valid, the user's information is extracted from the token and attached to the request object for further use in other parts of the app.



const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../../config"); 

module.exports = {
  check: (req, res, next) => {
    const authHeader = req.headers['authorization']; //stores the value of authorisation header from the incoming HTTP request

    // Check if authorization header is missing
    if (!authHeader) {
      return res.status(401).json({
        status: false,
        error: {
          message: 'Authorization header is not provided in the request',
        },
      }); 
    }

    // Check if authorization header starts with 'Bearer'
    if (!authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        status: false,
        error: {
          message: 'Invalid auth mechanism',
        },
      });// This method ensures that the authentication mechanism being used is JWT
    }

    // Extract the token from the authorization header
    const token = authHeader.split(' ')[1]; //The split(' ') method splits the Authorization header string by spaces, which separates the word Bearer from the token. The [1] accesses the second part of the array, which is the actual token.

    // Check if the token is missing
    if (!token) {
      return res.status(401).json({
        status: false,
        error: {
          message: 'Bearer token missing in the authorization header',
        },
      });
    }

    // Verify the token
    //This is the function provided by the jsonwebtoken library to verify the validity of the JWT. It takes three arguments:
    //token: The token to be verified.
    //jwtSecret: The secret key used to decode the token. If the token was signed with this secret key, it will be validated.
    //(err, user): A callback function that is invoked after the verification process. If the token is invalid, err will be non-null. If valid, the user object will be extracted from the decoded token.
    jwt.verify(token, jwtSecret, (err, user) => {
      if (err) {
        return res.status(403).json({
          status: false,
          error: 'Invalid access token provided, please login again',
        });
      }

      // Attach the user data to the request object
      req.user = user;
      next();
    });
  },
};
