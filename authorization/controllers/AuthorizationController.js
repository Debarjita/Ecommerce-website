const jwt = require ("jsonwebtoken"); // imports jsonwebtoken library  for authenticate puposes
const crypto = require ("crypto"); // imports crypto module used for password encryption
const UserModel = require("C:/Users/Debarjita/node-rest-api/common/models/User.js"); // this module contains methods for interacting with user database
const {roles , jwtSecret, jwtExpirationInSeconds} = require ("C:/Users/Debarjita/node-rest-api/config.js");


// generates an Access Token using username and userId for user's authentication
const generateAccessToken = (username, userId) => // generates a JWT token 
{
    return jwt.sign(
        {
            userId, username,
        },
        jwtSecret,
        {
            expiresIn: jwtExpirationInSeconds,
        }

    );
};

const encryptPassword = (password) => // A helper function that takes a plain text password and encrypts using SHA-256 algo
{
    const hash = crypto.createHash("sha256"); // creates a hash object using using the SHA-256 algo
    hash.update(password);  // This updates the hash with the provided password
    return hash.digest("hex"); // This generates the final encrypted password in hexadecimal format
};

module.exports = 
{
    register: (req, res) => // this function handles user registration
    {
        const payload = req.body; // this is the incoming data containing username , password, etc
       
        let encryptedPassword = encryptPassword(payload.password); // the users passowrd is encrypted before storing in the db
        let role = payload.role;

        if (!role)
        {
            role = roles.USER;
        }

        UserModel.createUser( //creates a new user in database
            Object.assign(payload, { password: encryptedPassword, role}) // combines the payload with the encrypted password and role  and then passed to createUser for storage in db
        )
        .then((user) => // the user object returned by the createUser function containing user's ID , etc
        {
            const accessToken = generateAccessToken(payload.username, user.id); // A JWT generated using the user's username and ID

            return res.status(200).json({ // returns a JSON response with the newly created user and their JWT
                status: true, 
                data: 
                {
                    user: user.toJSON(),
                    token:accessToken,
                },
            });
        })
        .catch((err) =>
        {
            return res.status(500).json({
                status: false,
                error:err,
            });
        });
    },

    login : (req, res) => // this func handles user login 
    {
        const { username , password} = req.body; // destructures the uname and password from incoming login request

        UserModel.findUser({username}) // this func queries the db for a user with the given username
        
        .then((user) => // if user not found, return 400 Bad Request error 
        {
            if (!user)
            {
              return res.status (400).json({
                status: false,
                error:{
                    message : 'could not find any uuser with username : \' ${username}\'.',
                },
              });
            }

            const encryptedPassword = encryptPassword(password); //encrypts the provided password using the same method that was used when the password was first stored

            if ( user.password !== encryptedPassword) // if provided password doesnt match stored encrypted password, return Bad Request 
            {
                return res.status(400).json({
                    status: false,
                    error : {
                        message: 'Provided username and password did not match',
                    },
                });
            }


            const accessToken = generateAccessToken(user.username, user.id); // A JWT is generated for the user

            return res.status(200).json({ // if login is successful, return JSON response containing user data and JWT 
                status: true,
                data:{
                    user: user.toJSON(),
                    token: accessToken,
                },
            });
        })
        .catch((err) =>  // if any error during any database handling , sends a 500 server error
        {
            return res.status(500).json({
                status:false,
                error:err,
            });
        });
    },
};

