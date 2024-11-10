// This code exports a JSON schema object that validates the structure 
//of incoming datat specifically ensuring the username and password 
//are present and meet the specific requirements



module.exports = {
    type: 'object',
    properties: 
    {
        username:{
            type:'string'
        },
        password : {
            type:'string'
        }
    },
    required: [
        'username','password'
    ],
    additionalProperties:false
};