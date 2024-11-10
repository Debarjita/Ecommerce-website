//This middleware function validates the request body against a JSON schema using the AJV library
//he function checks the body of the request against the schema and, if valid, allows the request to proceed to the next middleware or route handler.


const Ajv = require('ajv').default; // AJV stands for another JSON schema. AJV is a library that validates another JSON schema against a schema 
const AJV_OPTS = { allErrors: true }; // this is an options object used to configure Ajv.
// allErrors : true means Avj will collect all errors during validation instead of stopping at the first error.

module.exports = {
  verify: (schema) => {
    if (!schema) {
      throw new Error('Schema not provided');
    }

    return (req, res, next) => {
      const { body } = req; // body: Destructures the body property from the req object, which contains the JSON payload sent in the request.
      const ajv = new Ajv(AJV_OPTS); // This compiles the provided schema into a validation function (validate). The validate function can be used to check if the data conforms to the schema.
      const validate = ajv.compile(schema);
      const isValid = validate(body); // The compiled validate function checks the body of the request against the schema. It returns true if the body is valid, otherwise false.

      if (isValid) {
        return next(); // If the request body is valid, the next() function is called, which passes control to the next middleware in the Express route.
      }

      return res.send({
        status: false,
        error: {
          message: `Invalid Payload: ${ajv.errorsText(validate.errors)}`,
        },
      });
    };
  },
};
