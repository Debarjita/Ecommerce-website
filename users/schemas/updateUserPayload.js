//added first name and last name properties to the user table 


module.exports = {
    type: 'object',
    properties: {
      age: {
        type: 'number'
      },
      firstName: {
        type: 'string'
      },
      lastName: {
        type: 'string'
      }
    },
    additionalProperties: false
  };