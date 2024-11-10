const { DataTypes } = require("sequelize");
const { roles } = require("../../config");

const UserModel = {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  age: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: roles.USER,
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
};

let UserModelInstance = null;

module.exports = {
  // Corrected method name from 'initialise' to 'initialize'
  initialize: (sequelize) => {
    UserModelInstance = sequelize.define("user", UserModel);
  },

  createUser: (user) => {
    if (!UserModelInstance) throw new Error("Model not initialized");
    return UserModelInstance.create(user);
  },

  findUser: (query) => {
    if (!UserModelInstance) throw new Error("Model not initialized");
    return UserModelInstance.findOne({
      where: query,
    });
  },

  updateUser: (query, updatedValue) => {
    if (!UserModelInstance) throw new Error("Model not initialized");
    return UserModelInstance.update(updatedValue, {
      where: query,
    });
  },

  findAllUsers: (query) => {
    if (!UserModelInstance) throw new Error("Model not initialized");
    return UserModelInstance.findAll({
      where: query,
    });
  },

  deleteUser: (query) => {
    if (!UserModelInstance) throw new Error("Model not initialized");
    return UserModelInstance.destroy({
      where: query,
    });
  },
};
