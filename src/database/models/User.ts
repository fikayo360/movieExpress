import { DataTypes } from "sequelize"
import sequelizee from "../postgresConfig";

export const User = sequelizee.define('User', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull:false
      },
      username: {
        type: DataTypes.STRING,
        unique: true,
        allowNull:false
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        validate: {
          isEmail: true
        },
        allowNull:false
      },
      password: {
        type: DataTypes.STRING,
        allowNull:false
      },
      role:{
        type: DataTypes.STRING
      },
      resettoken:{
        type: DataTypes.STRING
      },
      hashedRt:{
        type: DataTypes.STRING
      }
  }); 

  User.sync().then(() => {
    console.log("User Model synced");
  });

  