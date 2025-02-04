'use strict';
const { Model, Sequelize, DataTypes } = require('sequelize');
const sequelize = require("./../../config/database");
const bcrypt = require("bcryptjs");

const user = sequelize.define('user', {
    id: {
      allowNull: false,
      autoIncrement: true,   
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    userType: {
      type: DataTypes.ENUM('1', '2', '3')
    },
    firstname: {
      type: DataTypes.STRING
    },
    lastName: {
      type: DataTypes.STRING
    },
    email: {
      type: DataTypes.STRING
    },
    password: {
      type: DataTypes.STRING
    },
    confirmPassword: {
      type: DataTypes.VIRTUAL,
      set(value) {
        if (value === this.password) {
          const hashPassword = bcrypt.hashSync(value, 10);
          this.setDataValue("password", hashPassword);
        } else {
          throw new Error("Passwords are not the same!");
        }
      }
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
    deletedAt: {
      type: DataTypes.DATE
    }
  },
  {
    paranoid: true,
    freezeTableName: true,
    modelName: 'user',
  }
);

module.exports = user;



// module.exports = (sequelize, DataTypes) => {
//   class user extends Model {
//     /**
//      * Helper method for defining associations.
//      * This method is not a part of Sequelize lifecycle.
//      * The `models/index` file will call this method automatically.
//      */
//     static associate(models) {
//       // define association here
//     }
//   }
//   user.init({
//     userType: DataTypes.ENUM,
//     firstname: DataTypes.STRING,
//     lastName: DataTypes.STRING,
//     email: DataTypes.STRING,
//     password: DataTypes.STRING
//   }, {
//     sequelize,
//     modelName: 'user',
//   });
//   return user;
// };