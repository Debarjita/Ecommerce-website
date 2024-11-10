const Express = require ("express");
const app = Express();
const cors = require ("cors"); // a middlewire that enables cross origin sharing , allows resources to be shared across different domains.
const morgan = require ("morgan");//  A logging middleware that logs request to the console 
const {Sequelize} = require ("sequelize"); // An Object Relational Mapper (ORM) used to interact with databases, in this case SQLite

const { port} = require("./config.js"); // fetches the port from config file
const PORT = process.env.PORT || port 

// Express Routes Import 
 const AuthorizationRoutes = require ("./authorization/routes.js");
 const UserRoutes = require ("C:/Users/Debarjita/node-rest-api/users/routes.js");
 const ProductRoutes = require ("./products/routes.js");

//sequalise model imports that represent tables in our database
const UserModel = require("C:/Users/Debarjita/node-rest-api/common/models/User.js");

const ProductModel = require ("./common/models/Product.js");

app.use(morgan("tiny")); // sets up morgan middleware for logging each request to the console in a tiny format
app.use(cors()); // sets up the cors middleware to allow cross-origin request from other domains

app.use(Express.json()); // this middleware parses incoming requests wth JSON payloads and makes data available in req.body

const sequelize = new Sequelize({
    dialect: "sqlite",
    storage:"C:/Users/Debarjita/node-rest-api/storage/data.db",
});

// Initialising the model on sequelize 
UserModel.initialize(sequelize); // This method initializes the UserModel and connects it to the Sequelize instance, allowing Sequelize to manage the model's database operations.
ProductModel.initialize(sequelize); // Similarly, this initializes the ProductModel.

sequelize
.sync() //  Synchronizes the Sequelize models with the database tables. If the tables don't exist in the database, Sequelize will create them based on the model definitions.
.then(() =>
{
    console.log("Sequelize Initialised !"); // Once the synchronization is complete, this message is logged to the console.

     app.use("/",AuthorizationRoutes); // : This attaches the imported AuthorizationRoutes to the root path of the application (e.g., /signup, /login).
     app.use("/user",UserRoutes); // Attaches UserRoutes to the /user endpoint, so all user-related requests (e.g., /user/profile) will be handled here.

     app.use("/product", ProductRoutes);

     app.listen(PORT, () =>  // This starts the Express application on the port defined by PORT.
    {
        console.log("Server Listening on PORT :", port); //This starts the Express application on the port defined by PORT.
    });
})
.catch((err) => // if there an error in seq initialise proces eg issues with db connection
{
    console.error("Sequelize Initiasation threw an error :", err);
});

