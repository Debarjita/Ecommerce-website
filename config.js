module.exports = {
    port: 3000, // defines the port number where the server will run
    jwtSecret: '!!CryptoCat@!!',// secret key used to sgn and verify JWT 
    jwtExpirationInSeconds: 60* 60,  // after this time, the tokens will expire and users need to reauthenticate
    roles: { // this section defines user roles for role based access control in the app
        USER: 'user',
        ADMIN: 'admin'
    },
    productPriceUnits: // this strcture can be used to handle multiple currencies
    {
        DOLLAR : 'dollar',
        EURO : 'euro',
        INR:'inr'
    }
}