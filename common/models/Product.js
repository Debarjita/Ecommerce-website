const { DataTypes } = require("sequelize");
const { productPriceUnits } = require("../../config");

const ProductModel = {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    image: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    price: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    priceUnit: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: productPriceUnits.DOLLAR,
    },
};

let ProductModelInstance = null; // Store the initialized model instance

module.exports = {
    // Corrected the method name from 'initialise' to 'initialize'
    initialize: (sequelize) => {
        ProductModelInstance = sequelize.define("product", ProductModel);
    },

    createProduct: (product) => {
        if (!ProductModelInstance) throw new Error("Model not initialized");
        return ProductModelInstance.create(product);
    },

    findProduct: (query) => {
        if (!ProductModelInstance) throw new Error("Model not initialized");
        return ProductModelInstance.findOne({
            where: query,
        });
    },

    updateProduct: (query, updatedValue) => {
        if (!ProductModelInstance) throw new Error("Model not initialized");
        return ProductModelInstance.update(updatedValue, { where: query });
    },

    findAllProducts: (query) => {
        if (!ProductModelInstance) throw new Error("Model not initialized");
        return ProductModelInstance.findAll({ where: query });
    },

    deleteProduct: (query) => {
        if (!ProductModelInstance) throw new Error("Model not initialized");
        return ProductModelInstance.destroy({ where: query });
    },
};
