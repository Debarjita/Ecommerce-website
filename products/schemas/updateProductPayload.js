//this code  defines a JSON schema that is used to validate the payload(request body) when creating or updating a product in the system.
//This schema is used with SchemaValidationMiddleware to validate the payload when creating or updating a product.
// By validating the data using this schema, the application can prevent malformed or invalida data from being processed

const { productPriceUnits } = require("../../config");
module.exports = {
  type: "object",
  properties: {
    name: {
      type: "string",
    },
    description: {
      type: "string",
    },
    image: {
      type: "string",
    },
    price: {
      type: "number",
    },
    priceUnit: {
      type: "string",
      enum: Object.values(productPriceUnits),
    },
  },
  additionalProperties: false,
};