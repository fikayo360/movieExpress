import { DataTypes } from "sequelize"
import sequelizee from "../postgresConfig"
import { Theater } from "./Theater"
import Movie from "./Movie"

export const Showtimes = sequelizee.define('Showtimes', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
      },
      startTime: {
        type: DataTypes.DATE
      },
      endTime: {
        type: DataTypes.DATE
      },
      theaterId: {
        type: DataTypes.UUID,
        references: {
            model:Theater,
      },
    },
      movieId: {
        type: DataTypes.UUID,
        references: {
            model:Movie,
      }
    }
  }); 

  Showtimes.sync().then(() => {
    console.log("Showtimes Model synced");
  });

export default Showtimes