import { DataTypes } from "sequelize"
import sequelizee from "../postgresConfig";
import { Theater } from "./Theater";

export const Movie = sequelizee.define('Movie', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
      },
      title: {
        type: DataTypes.STRING
      },
      genre: {
        type: DataTypes.STRING
      },
      duration: {
        type: DataTypes.INTEGER
      },
      rating: {
        type: DataTypes.INTEGER
      },
      posterimg: {
        type: DataTypes.STRING
      },
      expiryDate: {
        type: DataTypes.DATE
      },
      theaterId: {
        type: DataTypes.UUID,
        references: {
            model:Theater,
      }
    }
  }); 

  Movie.sync().then(() => {
    console.log("Movie Model synced");
  });

export default Movie