# E-Commerce website with NodeJS

This Express service provides authorization functionality and includes separate folders for users and products.
It uses Sequelize ORM with SQLite as the database, along with JSON Web Token (JWT) and AJV libraries for token-based authentication and JSON schema validation.

## Project Structure
 - `index.js`: The main entry point of the application.
 - `config.js`: Contains configuration files for the application.
 - `authorization`
   - `controllers`: Controller files for authentication endpoints.
   - `schemas`: JSON Schemas against which the body of various routes will be validated.
   - `routes.js`: Registers all the authentication routes.
 - `products`
   - `controllers`: Controller files for product master CRUD endpoints.
   - `schemas`: JSON Schemas against which the body of various routes will be validated.
   - `routes.js`: Registers all the product CRUD routes.
 - `users`
   - `controllers`: Controller files for user master CRUD endpoints.
   - `schemas`: JSON Schemas against which the body of various routes will be validated.
   - `routes.js`: Registers all the user CRUD routes.
 - `common`
   - `middlewares`: Various middlewares that can be used in various routes like (isAuthenticated, CheckPermissions etc.)
   - `models`: Sequelise models for the Product and User Tables
 - `storage`: Local storage, that stores all the SQLite tables.

## Key Libraries and Dependencies

- **Sequelize ORM** with SQLite for database operations
- **JWT** (JSON Web Token) for secure user authorization
- **AJV** for validating JSON request bodies against schemas
