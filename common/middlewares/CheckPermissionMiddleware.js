// This file checks and passes on if the user has a certain role in the db


const UserModel = require("../models/User"); // this imports the user model that provides functions to interact with user data like findUser

module.exports = {
  has: (role) => { // The has function is a middleware factory. It takes in a role as an argument and returns a function that serves as middleware in Express.js
    return (req, res, next) => { // next is a callback function that signals to move to the next middleware in the chain if no issues are found
      const {
        user: { userId }, // This is destructuring syntax that extracts the userId from the user object within the req object.This userId is used to identify the current user making the request.

      } = req;

      UserModel.findUser({ id: userId }).then((user) => { //this function is used to search for the user in the database
       
        if (!user) {
          return res.status(403).json({
            status: false,
            error: "Invalid access token provided, please login again.",
          });
        }

        const userRole = user.role; // extracts the role property from the user object (retrieved from database)

        // IF user does not possess the required role
        // THEN return forbidden error
        if (userRole !== role) {
          return res.status(403).json({
            status: false,
            error: `You need to be a ${role} to access this endpoint.`,
          });
        }

        next(); // If the user exists in the database and has the required role, next() tells express to move to the next middleware or route handler
      });
    };
  },
};