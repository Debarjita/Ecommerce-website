const router = require ("express").Router(); // Creates a router obj in express. Routers in express are used to handle requests to different endpoints . This router will handle the authorisation routes for the app.

//imports for authorisation
const AuthorizationController = require ("./controllers/AuthorizationController");
const schemaValidationMiddleware = require ("../common/middlewares/SchemaValidationMiddleware");

// JSON Schema Imports for payload verfication
const registerPayload = require ("./schemas/registerPayload");
const loginPayload = require ("./schemas/loginPayload");

router.post(    // defines a POST router at the /signup path. When a client sends a POST request to /signup this route will be invoked
    "/signup",
    [schemaValidationMiddleware.verify(registerPayload)], //This uses the middleware to validate the request's body against the registerPayload schema. If the data is valid, it proceeds to the next step; otherwise, it will return an error response.
    AuthorizationController.register  //This is the function from AuthorizationController that will handle the signup logic (e.g., creating a new user in the database, hashing passwords, etc.)
);
router.post(
    "/login",
    [schemaValidationMiddleware.verify(loginPayload)],
    AuthorizationController.login);

    module.exports = router;