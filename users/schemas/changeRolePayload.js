//admin endpoint used to change the role of any existing user 

const { roles } = require('../../config');

module.exports = {
  type: 'object',
  properties: {
    role: {
      type: 'string',
      enum: Object.values(roles)
    }
  },
  additionalProperties: false
};