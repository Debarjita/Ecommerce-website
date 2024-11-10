const {roles} = require ('../../config');

module.exports = 
{
    type : 'object', //This specifies that the root type of the schema is an object. This means the data being validated should be an object with key-value pairs.
    properties:
    {
        username:
        {
            type: 'string'
        },
        email: 
        {
            type: 'string',
            pattern:"^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$"
        },
        password:{
            type: 'string',
        },
        age:
        {
            type: 'number',
        },
        firstName:{
            type:'string'
        },
        lastName:{
            type:'string'
        },
        roles:{
            type:'string',
            enum:Object.values(roles)  // The enum keyword limits the allowed values for the role field to those specified.
                                       //Object.values(roles) dynamically generates an array of valid values from the roles object.
                                       //This ensures that the role field must match one of the predefined options like 'admin', 'user', or 'moderator', and nothing else.
        },
    },
    required: ['username', 'email', 'password', 'age', 'firstName', 'lastName'],
        additionalProperties: false
};