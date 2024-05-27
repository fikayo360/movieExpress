import { DataTypes } from "sequelize"
import sequelizee from "../postgresConfig";

export const Theater = sequelizee.define('Theater', {
     id:{
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull:false
      },
      name: {
        type: DataTypes.STRING
      },
      location: {
        type: DataTypes.STRING
      },
      seatingCapacity: {
        type: DataTypes.INTEGER
      }
  }); 

  Theater.sync().then(() => {
    console.log("theater Model synced");
  });
