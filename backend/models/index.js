const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');


const Book = sequelize.define('Book', {
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { notEmpty: true } 
    },
    author: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { notEmpty: true } 
    },
    stock: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    }
});

const BorrowLog = sequelize.define('BorrowLog', {
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    bookId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    borrowDate: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    latitude: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    longitude: {
        type: DataTypes.FLOAT,
        allowNull: false
    }
});

module.exports = { sequelize, Book, BorrowLog };